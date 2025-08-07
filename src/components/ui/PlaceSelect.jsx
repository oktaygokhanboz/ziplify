import { Autocomplete, TextField } from "@mui/material";
import competitors from "../../data/competitors.json";
import { useMemo } from "react";

function PlaceSelect({ competitorState }) {
  const [competitor, setCompetitor] = competitorState;

  // Memoize competitor list for performance
  const competitorList = useMemo(
    () =>
      competitors
        .filter((c) => c.home_locations_activity)
        .map((c) => ({
          label: `${c.name}, ${c.street_address}`,
          ...c,
        })),
    []
  );

  // Handle selection change using Autocomplete's value
  const handlePlaceChange = (event, value) => {
    if (value) {
      setCompetitor(
        competitors.find(
          (c) => value.label === `${c.name}, ${c.street_address}`
        ) || null
      );
    } else {
      setCompetitor(null);
    }
  };

  return (
    <Autocomplete
      sx={{ mt: 4 }}
      disablePortal
      fullWidth
      options={competitorList}
      onChange={handlePlaceChange}
      slotProps={{
        paper: {
          elevation: 2,
          sx: { fontSize: 14 },
        },
      }}
      filterOptions={(options, state) => {
        const input = state.inputValue.toLowerCase();
        return options
          .filter((option) => option.label.toLowerCase().includes(input))
          .slice(0, 50);
      }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Place" />}
    />
  );
}

export default PlaceSelect;
