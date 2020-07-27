import React, { useState } from "react";
import SensorChart from "../src/SensorChart";
import { createStyles, withStyles, WithStyles, Box } from "@material-ui/core";
import theme from "../src/theme";
import useSWR from "swr";
import { FIELDS } from "../src/constants";
import FloatingButtons from "../src/FloatingButtons";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: theme.palette.primary.light,
    flexFlow: "row wrap",
  },
});

const getTickSetting = (range) => (Math.abs(range) === 10 ? "days" : "months");

const Index: React.FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const [stateCode, setStateCode] = useState("CA");
  const [range, setRange] = useState(-10);
  const tickSetting = getTickSetting(range);

  const url = "https://covidtracking.com/api/v1/states/daily.json";
  const { data, error } = useSWR<any[]>(url, fetcher);

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;

  const stateData = data
    .filter((el) => el.state === stateCode)
    .sort((r1, r2) => r1.date - r2.date);

  const filteredData = stateData.slice(range);

  return (
    <div className={props.classes.root}>
      <FloatingButtons setStateCode={setStateCode} setRange={setRange} />
      {Object.keys(FIELDS).map((chartTitle: string) => (
        <Box component="div" m={4} key={chartTitle}>
          <SensorChart
            data={filteredData.map((r) => ({
              x: r.date,
              y: r[FIELDS[chartTitle]],
            }))}
            legend={chartTitle}
            stateCode={stateCode}
            tickSetting={tickSetting}
          />
        </Box>
      ))}
    </div>
  );
};

export default withStyles(styles)(Index);
