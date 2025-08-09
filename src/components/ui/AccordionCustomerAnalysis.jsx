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

export default function AccordionCustomerAnalysis({
  selectedOptionState,
  showAreasState,
}) {
  const [selectedOption, setSelectedOption] = selectedOptionState;
  const [showAreas, setShowAreas] = showAreasState;

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
                <FormGroup className="trade-area-checkboxes">
                  {showAreas?.map((checked, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checked}
                          name="trade-area"
                          onChange={() =>
                            setShowAreas((areas) => {
                              const updated = [...areas];
                              updated[index] = !updated[index];
                              return updated;
                            })
                          }
                        />
                      }
                      label={`%${30 + index * 20}`}
                    />
                  ))}
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
            <FormControlLabel
              name="home-zipcodes-toggle"
              control={<Switch defaultChecked />}
              label="Hide Home Zipcodes"
              labelPlacement="start"
            />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
