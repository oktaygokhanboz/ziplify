import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceSelect from "./PlaceSelect";

export default function AccordionCustomerAnalysis({
  selectedOptionState,
  competitorState,
}) {
  const [selectedOption, setSelectedOption] = selectedOptionState;

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontWeight={700} fontSize={18} component="span">
            Customer Analysis
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Option Buttons */}
          <div className="option-buttons">
            <Button
              variant={selectedOption === "trade" ? "contained" : "outlined"}
              onClick={() => setSelectedOption("trade")}
            >
              Trade Area
            </Button>
            <Button
              variant={selectedOption === "home" ? "contained" : "outlined"}
              onClick={() => setSelectedOption("home")}
            >
              Home Zipcodes
            </Button>
          </div>

          {/* Trade Area Inputs */}
          {selectedOption === "trade" && (
            <>
              <FormControl
                sx={{ mt: 4 }}
                component="fieldset"
                variant="standard"
                fullWidth
              >
                <FormLabel component="legend" sx={{ mb: 1 }}>
                  Persentile (%)
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={true} name="trade-area" />}
                    label="%30"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={false} name="trade-area" />}
                    label="%50"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={false} name="trade-area" />}
                    label="%70"
                  />
                </FormGroup>
              </FormControl>
              <FormControlLabel
                name="trade-area-toggle"
                control={<Switch defaultChecked />}
                label="Hide Trade Area"
                labelPlacement="start"
              />
            </>
          )}

          {/* Home Zipcodes Inputs */}
          {selectedOption === "home" && (
            <>
              <PlaceSelect competitorState={competitorState} />
              <FormControlLabel
                name="home-zipcodes-toggle"
                control={<Switch defaultChecked />}
                label="Hide Home Zipcodes"
                labelPlacement="start"
              />
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
