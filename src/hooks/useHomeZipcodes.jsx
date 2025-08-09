import { useState } from "react";
import homeZipcodesData from "../data/homeZipcodes.json";
import rawZipcodesData from "../data/zipcodes.json";

// --- Data Preparation ---
function parsePolygon(polygon) {
  return typeof polygon === "string" ? JSON.parse(polygon) : polygon;
}
const zipcodesData = rawZipcodesData.map((zip) => ({
  ...zip,
  polygon: parsePolygon(zip.polygon),
}));

function useHomeZipcodes() {
  const [homeZipcodes, setHomeZipcodes] = useState(null);
  const [percentages, setPercentages] = useState([]);

  const getZipcodes = (pid) => {
    const findedHomeZipcodes = homeZipcodesData.find(
      (homeZip) => pid === homeZip.pid
    );
    const locations = findedHomeZipcodes.locations;

    const locationIDs = locations
      .map((location) => Object.keys(location))
      .flat();
    setHomeZipcodes(
      zipcodesData.filter((zipcode) => locationIDs.includes(zipcode.id))
    );

    setPercentages(locations.map((location) => Object.values(location)).flat());
  };

  const clearZipcodes = () => {
    setHomeZipcodes(null);
  };

  return { homeZipcodes, percentages, getZipcodes, clearZipcodes };
}

export default useHomeZipcodes;
