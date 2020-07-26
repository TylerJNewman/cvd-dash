import React from "react";
import SensorChart from "../src/SensorChart";
import { temperatureData } from "../src/Data";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import theme from "../src/theme";

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
  return (
    <div className={props.classes.root}>
      <SensorChart data={temperatureData} />
    </div>
  );
};

export default withStyles(styles)(Index);
