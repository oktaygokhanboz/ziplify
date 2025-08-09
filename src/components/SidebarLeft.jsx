import AccordionPlaceAnalysis from "./ui/AccordionPlaceAnalysis";
import AccordionCustomerAnalysis from "./ui/AccordionCustomerAnalysis";

function SidebarLeft({
  radiusState,
  selectedIndustriesState,
  showPlacesState,
  selectedOptionState,
  showAreasState,
}) {
  return (
    <div id="sidebar-left">
      <AccordionPlaceAnalysis
        radiusState={radiusState}
        selectedIndustriesState={selectedIndustriesState}
        showPlacesState={showPlacesState}
      />
      <AccordionCustomerAnalysis
        selectedOptionState={selectedOptionState}
        showAreasState={showAreasState}
      />
    </div>
  );
}

export default SidebarLeft;
