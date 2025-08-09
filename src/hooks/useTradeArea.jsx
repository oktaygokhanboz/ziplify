import { useState } from "react";
import rawTradeAreasData from "../data/tradeAreas.json";

// --- Data Preparation ---
function parsePolygon(polygon) {
  return typeof polygon === "string" ? JSON.parse(polygon) : polygon;
}
const tradeAreaData = rawTradeAreasData.map((zip) => ({
  ...zip,
  polygon: parsePolygon(zip.polygon),
}));

function useTradeArea() {
  const [tradeAreas, setTradeAreas] = useState(null);

  const getTradeAreas = (pid) => {
    let findedTradeAreas = tradeAreaData.filter(
      (tradeArea) => pid === tradeArea.pid
    );

    findedTradeAreas = findedTradeAreas.sort(
      (a, b) => Number(a.trade_area) - Number(b.trade_area)
    );

    setTradeAreas(findedTradeAreas);
  };

  const clearTradeAreas = () => {
    setTradeAreas(null);
  };

  return { tradeAreas, setTradeAreas, getTradeAreas, clearTradeAreas };
}

export default useTradeArea;
