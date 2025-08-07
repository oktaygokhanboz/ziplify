import { Card, Typography } from "@mui/material";

const tradeAreaColor = {
  wide: "rgba(60, 140, 0, .3)",
  mid: "rgba(60, 140, 0, .6)",
  narrow: "rgba(60, 140, 0, .9)",
};

const tradeAreaContent = (
  <>
    <Typography component={"span"} fontSize={20} fontWeight={700}>
      Trade Area
    </Typography>
    <ul>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: tradeAreaColor.wide }}
        ></span>
        <Typography component={"span"}>30%</Typography>
      </li>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: tradeAreaColor.mid }}
        ></span>
        <Typography component={"span"}>50%</Typography>
      </li>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: tradeAreaColor.narrow }}
        ></span>
        <Typography component={"span"}>70%</Typography>
      </li>
    </ul>
  </>
);

const homeZipCodesColor = {
  low: "rgba(0, 140, 0, .20)",
  lowMid: "rgba(0, 140, 0, .39)",
  mid: "rgba(0, 140, 0, .57)",
  midTop: "rgba(0, 140, 0, .74)",
  top: "rgba(0, 140, 0, .9)",
};

const homeZipcodesContent = (
  <>
    <Typography component={"span"} fontSize={20} fontWeight={700}>
      Home Zipcode
    </Typography>
    <ul>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: homeZipCodesColor.low }}
        ></span>
        <Typography component={"span"}>0-4.5%</Typography>
      </li>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: homeZipCodesColor.lowMid }}
        ></span>
        <Typography component={"span"}>4.5%-25%</Typography>
      </li>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: homeZipCodesColor.mid }}
        ></span>
        <Typography component={"span"}>25%-29%</Typography>
      </li>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: homeZipCodesColor.midTop }}
        ></span>
        <Typography component={"span"}>29%-32.6%</Typography>
      </li>
      <li>
        <span
          className="indicator"
          style={{ backgroundColor: homeZipCodesColor.top }}
        ></span>
        <Typography component={"span"}>32.6%-45%</Typography>
      </li>
    </ul>
  </>
);

export default function Legend() {
  return (
    <div id="legend">
      <Card sx={{ padding: 3, minWidth: 120 }} variant="outlined">
        {tradeAreaContent}
      </Card>
      <Card sx={{ padding: 3, minWidth: 120 }} variant="outlined">
        {homeZipcodesContent}
      </Card>
    </div>
  );
}
