import { Card, Typography } from "@mui/material";

const tradeAreaColor = {
  wide: "rgba(0, 0, 0, .3)",
  mid: "rgba(0, 0, 0, .5)",
  narrow: "rgba(0, 0, 0, .7)",
};

const tradeAreaContent = (
  <>
    <Typography component={"span"} fontSize={18} fontWeight={700}>
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
  low: "rgba(227, 74, 51, 1)",
  lowMid: "rgba(253, 187, 132, 1)",
  mid: "rgba(247, 252, 185, 1)",
  midTop: "rgba(173, 221, 142, 1)",
  top: "rgba(49, 163, 84, 1)",
};

const homeZipcodesContent = (
  <>
    <Typography component={"span"} fontSize={18} fontWeight={700}>
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

export default function Legend({ selectedOptionState }) {
  const [selectedOption, setSelectedOption] = selectedOptionState;

  return (
    <div id="legend">
      {selectedOption === "trade" && (
        <Card sx={{ padding: 3, minWidth: 120 }} variant="outlined">
          {tradeAreaContent}
        </Card>
      )}
      {selectedOption === "home" && (
        <Card sx={{ padding: 3, minWidth: 120 }} variant="outlined">
          {homeZipcodesContent}
        </Card>
      )}
    </div>
  );
}
