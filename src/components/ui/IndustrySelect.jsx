import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import competitors from "../../data/competitors.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.75 + ITEM_PADDING_TOP,
    },
  },
};

function IndustrySelect({ selectedIndustriesState }) {
  const [selectedIndustries, setSelectedIndustries] = selectedIndustriesState;

  let industries = competitors.map((c) => c.sub_category);
  industries = [...new Set(industries)];
  industries = industries.filter((i) => i !== "");

  const handleIndustryChange = (e) => {
    const { value } = e.target;
    setSelectedIndustries(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="multiple-industry-label">Industry</InputLabel>
        <Select
          labelId="industries-label"
          id="industries"
          multiple
          value={selectedIndustries}
          onChange={handleIndustryChange}
          input={<OutlinedInput label="Industry" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {industries.map((industry) => (
            <MenuItem key={industry} value={industry}>
              <Checkbox checked={selectedIndustries.includes(industry)} />
              <ListItemText primary={industry} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{ mt: 1, textTransform: "capitalize" }}
        variant="outlined"
        size="small"
        onClick={() => setSelectedIndustries([])}
        disabled={selectedIndustries.length === 0}
      >
        Clear Industries
      </Button>
    </>
  );
}

export default IndustrySelect;
