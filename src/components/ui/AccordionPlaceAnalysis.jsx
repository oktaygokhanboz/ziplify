import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IndustrySelect from "../ui/IndustrySelect";

// Radius input as a separate component for clarity
function RadiusInput({ value, onChange }) {
  return (
    <TextField
      id="radius"
      label="Radius"
      variant="outlined"
      type="number"
      fullWidth
      margin="dense"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">miles</InputAdornment>,
        inputProps: { min: 0 },
      }}
    />
  );
}

function AccordionPlaceAnalysis({
  radiusState,
  selectedIndustriesState,
  showPlacesState,
}) {
  const [radius, setRadius] = radiusState;
  const [showPlaces, setShowPlaces] = showPlacesState;

  const handleRadiusChange = (e) => setRadius(e.target.value);
  const handlePlacesToggle = () => {
    setShowPlaces(!showPlaces);
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography fontWeight={700} fontSize={18} component="span">
          Place Analysis
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {/* Radius Input */}
        <RadiusInput value={radius} onChange={handleRadiusChange} />

        {/* Industry Selection */}
        <IndustrySelect selectedIndustriesState={selectedIndustriesState} />

        {/* Hide Places Toggle */}
        <FormControlLabel
          name="place-toggle"
          control={<Switch defaultChecked />}
          label="Hide Places"
          labelPlacement="start"
          checked={showPlaces}
          onChange={handlePlacesToggle}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionPlaceAnalysis;
