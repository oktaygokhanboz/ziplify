import { useRef, useState, useMemo, useCallback } from "react";
import { Map, useControl } from "react-map-gl/mapbox";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { PlaceTooltip } from "./ui/Tooltip";
import "mapbox-gl/dist/mapbox-gl.css";
import rawZipcodes from "../data/zipcodes.json";
import competitors from "../data/competitors.json";
import myPlace from "../data/myPlace.json";
import homeZipcodes from "../data/homeZipcodes.json";

// --- Constants ---
const ICON_ATLAS = "/src/assets/location-icon-atlas.png";
const ICON_MAPPING = "/src/data/location-icon-mapping.json";
const COLORS = {
  competitor: [255, 105, 0],
  myPlace: [0, 140, 0],
  polygonFill: [80, 180, 0, 180],
  polygonLine: [255, 255, 255],
};

// --- Utilities ---
function parsePolygon(polygon) {
  return typeof polygon === "string" ? JSON.parse(polygon) : polygon;
}

// --- Data Preparation ---
const zipcodes = rawZipcodes.map((zip) => ({
  ...zip,
  polygon: parsePolygon(zip.polygon),
}));

// --- DeckGL Overlay ---
function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

// --- Layer Factories ---
function createPolygonLayer(data, getFillColor) {
  return new PolygonLayer({
    id: "zipcodes",
    data,
    getPolygon: (d) =>
      d.polygon.type === "Polygon"
        ? d.polygon.coordinates
        : d.polygon.coordinates.flat(),
    getFillColor,
    getLineColor: COLORS.polygonLine,
    getLineWidth: 20,
    lineWidthMinPixels: 1,
    pickable: true,
  });
}

function createIconLayer({ id, data, color, size, onClick }) {
  return new IconLayer({
    id,
    data,
    getColor: () => color,
    getIcon: () => "marker",
    getPosition: (d) => [d.longitude, d.latitude],
    getSize: () => size,
    iconAtlas: ICON_ATLAS,
    iconMapping: ICON_MAPPING,
    pickable: true,
    onClick,
  });
}

// --- Main Component ---
export default function MapContainer({
  radius,
  selectedIndustries,
  showPlaces,
  competitor,
}) {
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const mapRef = useRef();

  // --- Filtered Data ---
  const filteredZipcodesData = useMemo(() => {
    if (!competitor) return { zipCodes: [], customerPercentage: [] };

    const selectedHomeZipcode = homeZipcodes.find(
      (zip) => zip.pid === competitor.pid
    );
    const selectedZipcodes = selectedHomeZipcode?.locations.map(
      (e) => Object.keys(e)[0]
    );
    const customerPercentage = selectedHomeZipcode?.locations.map(
      (e) => Object.values(e)[0]
    );

    const zipCodes = zipcodes.filter((z) => selectedZipcodes?.includes(z.id));
    return { zipCodes, customerPercentage };
  }, [competitor]);

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

  const myPlaceData = useMemo(
    () => competitors.filter((d) => d.pid === myPlace.id),
    []
  );

  // --- Handlers ---
  const handlePinpointClick = useCallback((info) => setTooltipInfo(info), []);
  const handleMapMoveOrClick = useCallback(() => setTooltipInfo(null), []);

  // --- Layers ---
  const polygonLayer = useMemo(() => {
    const { zipCodes, customerPercentage } = filteredZipcodesData;
    return createPolygonLayer(zipCodes, (d, { index }) => {
      const percentage = customerPercentage?.[index];
      if (percentage >= 0 && percentage < 4.5) return [0, 140, 0, 50];
      if (percentage >= 4.5 && percentage < 25) return [0, 140, 0, 100];
      if (percentage >= 25 && percentage < 29) return [0, 140, 0, 145];
      if (percentage >= 29 && percentage < 32.6) return [0, 140, 0, 190];
      if (percentage >= 32.6 && percentage < 45) return [0, 140, 0, 220];
      return [0, 0, 0];
    });
  }, [filteredZipcodesData]);

  const competitorLayer = useMemo(
    () =>
      createIconLayer({
        id: "competitors",
        data: filteredCompetitors,
        color: COLORS.competitor,
        onClick: handlePinpointClick,
        size: 24,
      }),
    [filteredCompetitors, handlePinpointClick]
  );

  const myPlaceLayer = useMemo(
    () =>
      createIconLayer({
        id: "my-place",
        data: myPlaceData,
        color: COLORS.myPlace,
        onClick: handlePinpointClick,
        size: 32,
      }),
    [myPlaceData, handlePinpointClick]
  );

  // --- Render ---
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
      <DeckGLOverlay layers={[polygonLayer, competitorLayer, myPlaceLayer]} />
      {tooltipInfo && <PlaceTooltip info={tooltipInfo} />}
    </Map>
  );
}
