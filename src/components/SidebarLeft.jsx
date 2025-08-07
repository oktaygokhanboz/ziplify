import AccordionPlaceAnalysis from "./ui/AccordionPlaceAnalysis";
import AccordionCustomerAnalysis from "./ui/AccordionCustomerAnalysis";

function SidebarLeft({
  radiusState,
  selectedIndustriesState,
  showPlacesState,
}) {
  return (
    <div id="sidebar-left">
      <AccordionPlaceAnalysis
        radiusState={radiusState}
        selectedIndustriesState={selectedIndustriesState}
        showPlacesState={showPlacesState}
      />
      <AccordionCustomerAnalysis />
    </div>
  );
}

export default SidebarLeft;
