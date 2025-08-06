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
  Autocomplete,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionCustomerAnalysis() {
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
          <Button variant="outlined">Trade Area</Button>
          <Button variant="outlined">Home Zipcodes</Button>
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            variant="standard"
            fullWidth
          >
            <FormLabel component="legend">Persentile</FormLabel>
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
          <Autocomplete
            disablePortal
            fullWidth
            options={[
              { label: "Option1" },
              { label: "Option2" },
              { label: "Option3" },
              { label: "Option4" },
              { label: "Option5" },
              { label: "Option6" },
              { label: "Option7" },
              { label: "Option8" },
              { label: "Option9" },
            ]}
            filterOptions={(options, state) => {
              const filtered = options.filter((option) =>
                option.label
                  .toLowerCase()
                  .includes(state.inputValue.toLowerCase())
              );
              return filtered.slice(0, 5);
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Place Name" />
            )}
          />
          <FormControlLabel
            name="home-zipcodes-toggle"
            control={<Switch defaultChecked />}
            label="Hide Home Zipcodes"
            labelPlacement="start"
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
