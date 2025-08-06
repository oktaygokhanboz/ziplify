import { useRef, useState } from "react";
import { Map, useControl } from "react-map-gl/mapbox";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { PlaceTooltip } from "./ui/Tooltip";
import "mapbox-gl/dist/mapbox-gl.css";
import rawZipcodes from "../data/zipcodes.json";
import competitors from "../data/competitors.json";
import myPlace from "../data/myPlace.json";

// Utility to parse polygons
const parsePolygon = (polygon) =>
  typeof polygon === "string" ? JSON.parse(polygon) : polygon;

// Memoized zipcodes data
const zipcodes = rawZipcodes.map((zip) => ({
  ...zip,
  polygon: parsePolygon(zip.polygon),
}));

// DeckGL overlay component
function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

// Polygon layer factory
function usePolygonLayer(data) {
  return new PolygonLayer({
    id: "zipcodes",
    data,
    getPolygon: (d) =>
      d.polygon.type === "Polygon"
        ? d.polygon.coordinates
        : d.polygon.coordinates.flat(),
    getFillColor: [60, 140, 0, 180],
    getLineColor: [255, 255, 255],
    getLineWidth: 20,
    lineWidthMinPixels: 1,
    pickable: true,
  });
}

// Icon layer factory
function useIconLayer(
  data,
  handlePinpointClick,
  hoveredPinId,
  handlePinpointHover
) {
  return [
    new IconLayer({
      id: "competitors",
      data: data.filter((d) => d.pid !== myPlace.id),
      getColor: (d) =>
        d.pid === hoveredPinId ? [255, 140, 0] : [200, 200, 200],
      getIcon: () => "marker",
      getPosition: (d) => [d.longitude, d.latitude],
      getSize: 20,
      iconAtlas: "/src/assets/location-icon-atlas.png",
      iconMapping: "/src/data/location-icon-mapping.json",
      pickable: true,
      onClick: (d, e) => handlePinpointClick(d, e),
      onHover: handlePinpointHover,
    }),
    new IconLayer({
      id: "my-place",
      data: data.filter((d) => d.pid === myPlace.id),
      getColor: [0, 140, 0],
      getIcon: () => "marker",
      getPosition: (d) => [d.longitude, d.latitude],
      getSize: 32,
      iconAtlas: "/src/assets/location-icon-atlas.png",
      iconMapping: "/src/data/location-icon-mapping.json",
      pickable: true,
      onClick: (d, e) => handlePinpointClick(d, e),
    }),
  ];
}

function MapContainer() {
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [hoveredPinId, setHoveredPinId] = useState(null);
  const mapRef = useRef();

  const handlePinpointClick = (info) => {
    setTooltipInfo(info);
    setHoveredPinId(info?.object?.pid ?? null); // Keep hovered color while tooltip is open
  };

  // Add hover handler
  const handlePinpointHover = (info) => {
    if (!tooltipInfo) {
      setHoveredPinId(info?.object?.pid ?? null);
    }
  };

  const polygonLayer = usePolygonLayer(zipcodes);
  const iconLayer = useIconLayer(
    competitors,
    handlePinpointClick,
    hoveredPinId,
    handlePinpointHover
  );

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: myPlace.longitude,
        latitude: myPlace.latitude,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f4f4f2",
      }}
      onMove={() => {
        setTooltipInfo(null);
        setHoveredPinId(null);
      }}
      onClick={() => {
        setTooltipInfo(null);
        setHoveredPinId(null);
      }}
    >
      <DeckGLOverlay layers={[...iconLayer]} />
      {tooltipInfo && <PlaceTooltip info={tooltipInfo} />}
    </Map>
  );
}

export default MapContainer;
