import { Card, Stack, Button } from "@mui/material";

function PlaceTooltip({ info }) {
  const { object: place } = info;
  return (
    <Card
      className="tooltip"
      sx={{
        position: "absolute",
        zIndex: 20,
        padding: 2,
        minWidth: 180,
        maxWidth: 220,
        transform: `translate(${info.x}px, ${info.y}px)`,
      }}
      variant="outlined"
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {place.logo && <img src={place.logo} width={28} height={28}></img>}
        <span className="title">{place.name}</span>
      </Stack>
      <Stack className={"desc"} marginTop={0.5}>
        <div className="industry">{place.sub_category}</div>
        <div>{place.street_address}</div>
        <div className="city-region">
          {place.city}, {place.region}
        </div>
      </Stack>
      <Stack className={"buttons"} spacing={1}>
        <Button variant="outlined" size="small">
          Show Trade Area
        </Button>
        <Button variant="outlined" size="small">
          Show Home Zipcodes
        </Button>
      </Stack>
    </Card>
  );
}

export { PlaceTooltip };
