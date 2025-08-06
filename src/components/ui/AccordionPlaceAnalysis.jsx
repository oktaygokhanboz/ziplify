import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionPlaceAnalysis() {
  return (
    <>
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
          <TextField
            id="radius"
            label="Radius"
            variant="outlined"
            type="number"
            fullWidth
            margin="dense"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">miles</InputAdornment>
                ),
              },
            }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-label">Industry</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            name="place-toggle"
            control={<Switch defaultChecked />}
            label="Hide Places"
            labelPlacement="start"
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
