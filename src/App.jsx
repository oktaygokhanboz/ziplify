import { useState } from "react";
import MapContainer from "./components/MapContainer";
import SidebarLeft from "./components/SidebarLeft";
import Legend from "./components/Legend";

function App() {
  const [radius, setRadius] = useState(null);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [showPlaces, setShowPlaces] = useState(true);
  const [selectedOption, setSelectedOption] = useState("trade");
  const [showAreas, setShowAreas] = useState([true, true, true]);

  return (
    <div id="dashboard">
      <SidebarLeft
        radiusState={[radius, setRadius]}
        selectedIndustriesState={[selectedIndustries, setSelectedIndustries]}
        showPlacesState={[showPlaces, setShowPlaces]}
        selectedOptionState={[selectedOption, setSelectedOption]}
        showAreasState={[showAreas, setShowAreas]}
      />
      <MapContainer
        radius={radius}
        selectedIndustries={selectedIndustries}
        showPlaces={showPlaces}
        selectedOption={selectedOption}
        showAreas={showAreas}
      />
      <Legend selectedOptionState={[selectedOption, setSelectedOption]} />
    </div>
  );
}

export default App;
