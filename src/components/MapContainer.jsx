import { useRef, useState, useMemo, useCallback } from "react";
import { Map, useControl } from "react-map-gl/mapbox";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { PolygonLayer, IconLayer } from "@deck.gl/layers";
import { PlaceTooltip } from "./ui/Tooltip";
import "mapbox-gl/dist/mapbox-gl.css";
import competitors from "../data/competitors.json";
import myPlace from "../data/myPlace.json";
import useHomeZipcodes from "../hooks/useHomeZipcodes.jsx";
import useTradeArea from "../hooks/useTradeArea.jsx";

// --- Constants ---
const ICON_ATLAS = "/src/assets/location-icon-atlas.png";
const ICON_MAPPING = "/src/data/location-icon-mapping.json";
const COLORS = {
  competitor: [255, 80, 0],
  myPlace: [0, 140, 0],
  polygonFill: [80, 180, 0, 180],
  polygonLine: [255, 255, 255],
};

// --- DeckGL Overlay ---
function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

function createPolygonLayer(id, data, getFillColor) {
  return new PolygonLayer({
    id,
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
  selectedOption,
  showAreas,
}) {
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const mapRef = useRef();
  const { homeZipcodes, percentages, getZipcodes, clearZipcodes } =
    useHomeZipcodes();
  const { tradeAreas, setTradeAreas, getTradeAreas, clearTradeAreas } =
    useTradeArea();

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
  const getTooltip = useCallback(({ object }) => {
    return (
      object && {
        html: `<span>${
          object.name || object.id || "%" + object.trade_area + " Trade Area"
        }</span>`,
        style: {
          backgroundColor: "#fff",
          fontSize: ".875rem",
          fontWeight: "bold",
          color: "#1976d2",
        },
      }
    );
  }, []);

  const handleGetZipcodesClick = (pid) => {
    getZipcodes(pid);
  };

  const handleGetTradeAreasClick = (pid) => {
    getTradeAreas(pid);
  };

  // --- Layers ---
  const filteredTradeAreas = useMemo(() => {
    const [show30, show50, show70] = showAreas;
    const checkboxes = {
      30: show30,
      50: show50,
      70: show70,
    };
    return (tradeAreas || []).filter((area) => checkboxes[area.trade_area]);
  }, [tradeAreas, showAreas]);

  const tradeAreasLayer = useMemo(() => {
    return createPolygonLayer(
      "trade-areas",
      filteredTradeAreas,
      (d, { index }) => {
        const area = filteredTradeAreas?.[index]?.trade_area;
        if (area === 30) return [0, 0, 0, 76.5];
        if (area === 50) return [0, 0, 0, 127.5];
        if (area === 70) return [0, 0, 0, 178.5];
        return [0, 0, 0, 0];
      }
    );
  }, [filteredTradeAreas, selectedOption]);

  const polygonLayer = useMemo(() => {
    return createPolygonLayer("zipcodes", homeZipcodes, (d, { index }) => {
      console.log(homeZipcodes);
      const percentage = percentages?.[index];
      if (percentage >= 0 && percentage < 4.5) return [227, 74, 51, 128];
      if (percentage >= 4.5 && percentage < 25) return [253, 187, 132, 128];
      if (percentage >= 25 && percentage < 29) return [247, 252, 185, 128];
      if (percentage >= 29 && percentage < 32.6) return [173, 221, 142, 128];
      if (percentage >= 32.6 && percentage < 45) return [49, 163, 84, 128];
      return [0, 0, 0, 0];
    });
  }, [homeZipcodes, selectedOption]);

  const competitorLayer = useMemo(
    () =>
      createIconLayer({
        id: "competitors",
        data: filteredCompetitors,
        color: COLORS.competitor,
        onClick: handlePinpointClick,
        size: 20,
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
      <DeckGLOverlay
        layers={[
          selectedOption === "trade" ? tradeAreasLayer : polygonLayer,
          competitorLayer,
          myPlaceLayer,
        ]}
        getTooltip={getTooltip}
      />
      {tooltipInfo && (
        <PlaceTooltip
          info={tooltipInfo}
          selectedOption={selectedOption}
          handleTradeAreasClick={handleGetTradeAreasClick}
          handleZipcodesClick={handleGetZipcodesClick}
        />
      )}
    </Map>
  );
}

export { useHomeZipcodes };
