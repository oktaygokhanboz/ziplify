import AccordionPlaceAnalysis from "./ui/AccordionPlaceAnalysis";
import AccordionCustomerAnalysis from "./ui/AccordionCustomerAnalysis";

function SidebarLeft({
  radiusState,
  selectedIndustriesState,
  showPlacesState,
  selectedOptionState,
  competitorState,
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
        competitorState={competitorState}
      />
    </div>
  );
}

export default SidebarLeft;
