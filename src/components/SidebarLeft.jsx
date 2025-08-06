import AccordionPlaceAnalysis from "./ui/AccordionPlaceAnalysis";
import AccordionCustomerAnalysis from "./ui/AccordionCustomerAnalysis";

function SidebarLeft() {
  return (
    <div id="sidebar-left">
      <AccordionPlaceAnalysis />
      <AccordionCustomerAnalysis />
    </div>
  );
}

export default SidebarLeft;
