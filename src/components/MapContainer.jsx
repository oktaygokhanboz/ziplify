import { useRef, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Map, useControl } from "react-map-gl/mapbox";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { PlaceTooltip } from "./ui/Tooltip";
import "mapbox-gl/dist/mapbox-gl.css";
import rawZipcodes from "../data/zipcodes.json";
import competitors from "../data/competitors.json";
import myPlace from "../data/myPlace.json";

// Constants
const ICON_ATLAS = "/src/assets/location-icon-atlas.png";
const ICON_MAPPING = "/src/data/location-icon-mapping.json";
const COLORS = {
  competitor: [255, 200, 160],
  myPlace: [0, 140, 0],
  polygonFill: [60, 140, 0, 180],
  polygonLine: [255, 255, 255],
};

// Utility to parse polygons
function parsePolygon(polygon) {
  return typeof polygon === "string" ? JSON.parse(polygon) : polygon;
}

// Memoized zipcodes data
const memoizedZipcodes = rawZipcodes.map((zip) => ({
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
function getPolygonLayer(data) {
  return new PolygonLayer({
    id: "zipcodes",
    data,
    getPolygon: (d) =>
      d.polygon.type === "Polygon"
        ? d.polygon.coordinates
        : d.polygon.coordinates.flat(),
    getFillColor: COLORS.polygonFill,
    getLineColor: COLORS.polygonLine,
    getLineWidth: 20,
    lineWidthMinPixels: 1,
    pickable: true,
  });
}

// Competitor icon layer factory
function getCompetitorLayer({ data, onClick }) {
  return new IconLayer({
    id: "competitors",
    data,
    getColor: (d) => COLORS.competitor,
    getIcon: () => "marker",
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: 24,
    iconAtlas: ICON_ATLAS,
    iconMapping: ICON_MAPPING,
    pickable: true,
    onClick,
  });
}

// My place icon layer factory
function getMyPlaceLayer({ data, onClick }) {
  return new IconLayer({
    id: "my-place",
    data,
    getColor: COLORS.myPlace,
    getIcon: () => "marker",
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: 24,
    iconAtlas: ICON_ATLAS,
    iconMapping: ICON_MAPPING,
    pickable: true,
    onClick,
  });
}

export default function MapContainer({
  radius,
  selectedIndustries,
  showPlaces,
}) {
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const mapRef = useRef();

  // Memoized filtered competitor data
  const filteredCompetitors = useMemo(() => {
    return competitors.filter(
      (d) =>
        showPlaces &&
        d.pid !== myPlace.id &&
        (!radius || d.distance <= radius) &&
        (selectedIndustries.length === 0 ||
          selectedIndustries.includes(d.sub_category))
    );
  }, [radius, selectedIndustries, showPlaces]);

  // Memoized myPlace data
  const myPlaceData = useMemo(
    () => competitors.filter((d) => d.pid === myPlace.id),
    []
  );

  // Handlers
  const handlePinpointClick = useCallback((info) => {
    setTooltipInfo(info);
  }, []);

  const handleMapMoveOrClick = useCallback(() => {
    setTooltipInfo(null);
  }, []);

  // Memoized layers
  const polygonLayer = useMemo(() => getPolygonLayer(memoizedZipcodes), []);
  const competitorLayer = useMemo(
    () =>
      getCompetitorLayer({
        data: filteredCompetitors,
        myPlaceId: myPlace.id,
        onClick: handlePinpointClick,
        radius,
        selectedIndustries,
        showPlaces,
      }),
    [filteredCompetitors, handlePinpointClick]
  );
  const myPlaceLayer = useMemo(
    () =>
      getMyPlaceLayer({
        data: myPlaceData,
        myPlaceId: myPlace.id,
        onClick: handlePinpointClick,
      }),
    [myPlaceData, handlePinpointClick]
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
      onMove={handleMapMoveOrClick}
      onClick={handleMapMoveOrClick}
    >
      <DeckGLOverlay layers={[competitorLayer, myPlaceLayer]} />
      {tooltipInfo && <PlaceTooltip info={tooltipInfo} />}
    </Map>
  );
}

MapContainer.propTypes = {
  radius: PropTypes.number,
  selectedIndustries: PropTypes.arrayOf(PropTypes.string),
};
