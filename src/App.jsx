import { useState } from "react";
import MapContainer from "./components/MapContainer";
import SidebarLeft from "./components/SidebarLeft";
import Legend from "./components/Legend";

function App() {
  const [radius, setRadius] = useState(null);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [showPlaces, setShowPlaces] = useState(true);
  const [selectedOption, setSelectedOption] = useState("trade");
  const [competitor, setCompetitor] = useState(null);

  return (
    <div id="dashboard">
      <SidebarLeft
        radiusState={[radius, setRadius]}
        selectedIndustriesState={[selectedIndustries, setSelectedIndustries]}
        showPlacesState={[showPlaces, setShowPlaces]}
        selectedOptionState={[selectedOption, setSelectedOption]}
        competitorState={[competitor, setCompetitor]}
      />
      <MapContainer
        radius={radius}
        selectedIndustries={selectedIndustries}
        showPlaces={showPlaces}
        competitor={competitor}
      />
      <Legend />
    </div>
  );
}

export default App;
