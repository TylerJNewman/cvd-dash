import React, { useState } from "react";
import SensorChart from "../src/SensorChart";
import { createStyles, withStyles, WithStyles, Box } from "@material-ui/core";
import theme from "../src/theme";
import useSWR from "swr";
import { FIELDS } from "../src/constants.tsx";

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

const Index: React.FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const [stateCode, useStateCode] = useState("CA");
  const url = "https://covidtracking.com/api/v1/states/daily.json";

  const { data, error } = useSWR<string[]>(url, fetcher);

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;

  const lastTenDays = -10;
  const lastThreeMonths = -1 * 30 * 3;

  const stateData = data
    ? data
        .filter((el) => el.state === stateCode)
        .sort((r1, r2) => r1.date - r2.date)
    : [];

  const filteredData = stateData.slice(lastTenDays);

  return (
    <div className={props.classes.root}>
      {Object.keys(FIELDS).map((chartTitle: string) => (
        <Box component="span" m={4}>
          <SensorChart
            data={filteredData.map((r) => ({
              x: r.dateModified,
              y: r[FIELDS[chartTitle]],
            }))}
            legend={chartTitle}
            stateCode={stateCode}
          />
        </Box>
      ))}
    </div>
  );
};

export default withStyles(styles)(Index);
