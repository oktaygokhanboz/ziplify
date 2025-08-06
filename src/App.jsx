import MapContainer from "./components/MapContainer";
import SidebarLeft from "./components/SidebarLeft";
import Legend from "./components/Legend";
import { PlaceTooltip } from "./components/ui/Tooltip";

function App() {
  return (
    <div id="dashboard">
      <SidebarLeft />
      <MapContainer />
      <Legend />
    </div>
  );
}

export default App;
