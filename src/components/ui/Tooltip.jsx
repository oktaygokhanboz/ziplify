import { Card, Stack, Button, Tooltip } from "@mui/material";

function PlaceTooltip({
  info,
  selectedOption,
  handleTradeAreasClick,
  handleZipcodesClick,
}) {
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
      {selectedOption === "trade" ? (
        <Tooltip
          title={
            !place.trade_area_activity &&
            "Trade area data is not available for this place."
          }
          arrow
        >
          <div>
            <Button
              className="button"
              variant="outlined"
              size="small"
              disabled={!place.trade_area_activity}
              onClick={() => handleTradeAreasClick(place.pid)}
            >
              Show Trade Area
            </Button>
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          title={
            !place.home_locations_activity &&
            "Home zipcodes data is not available for this place."
          }
          arrow
        >
          <div>
            <Button
              className="button"
              variant="outlined"
              size="small"
              disabled={!place.home_locations_activity}
              onClick={() => handleZipcodesClick(place.pid)}
            >
              Show Home Zipcodes
            </Button>
          </div>
        </Tooltip>
      )}
    </Card>
  );
}

export { PlaceTooltip };
