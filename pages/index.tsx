import React, { useState } from "react";
import SensorChart from "../src/SensorChart";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import theme from "../src/theme";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.primary.light,
  },
});

const Index: React.FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const [stateCode, useStateCode] = useState("CA");
  const url = "https://covidtracking.com/api/v1/states/daily.json";

  const { data, error } = useSWR<string[]>(url, fetcher);

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;

  const stateData = data
    ? data
        .filter((el) => el.state === stateCode)
        .sort((r1, r2) => r1.date - r2.date)
        .slice(-10)
        .map((r) => ({ x: r.dateModified, y: r.death }))
    : [];

  console.log(stateData);
  return (
    <div className={props.classes.root}>
      <SensorChart data={stateData} legend="Deaths" stateCode={stateCode} />
    </div>
  );
};

export default withStyles(styles)(Index);
