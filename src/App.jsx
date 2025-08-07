import { useState } from "react";
import MapContainer from "./components/MapContainer";
import SidebarLeft from "./components/SidebarLeft";
import Legend from "./components/Legend";

function App() {
  const [radius, setRadius] = useState(null);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [showPlaces, setShowPlaces] = useState(true);

  return (
    <div id="dashboard">
      <SidebarLeft
        radiusState={[radius, setRadius]}
        selectedIndustriesState={[selectedIndustries, setSelectedIndustries]}
        showPlacesState={[showPlaces, setShowPlaces]}
      />
      <MapContainer
        radius={radius}
        selectedIndustries={selectedIndustries}
        showPlaces={showPlaces}
      />
      <Legend />
    </div>
  );
}

export default App;
