import React, { useCallback, useEffect, useState } from "react";
import { PointTooltipProps, ResponsiveLine, Serie } from "@nivo/line";
import {
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  useTheme,
} from "@material-ui/core";
import { Scale } from "@nivo/scales";
import { getStdDeviation, formatDate, getRequiredDateFormat } from "./Utils";

const styles = (theme: Theme) =>
  createStyles({
    chartRoot: {
      padding: theme.spacing(6),
      borderRadius: theme.spacing(2),
      backgroundColor: "white",
      width: 668,
      height: 366,
      border: "1px solid rgba(0,0,0,0.15)",
      transition: "box-shadow 0.3s ease-in-out",
      "&:hover": {
        border: "1px solid " + theme.palette.primary.main,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      },
    },
    toolTip: {
      backgroundColor: "white",
      border: "2px solid " + theme.palette.primary.main,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(2, 3),
      fontFamily: "Helvetica",
      fontSize: 12,
      color: theme.palette.primary.main,
      fontWeight: "bold",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      paddingTop: theme.spacing(3),
    },
  });

interface SensorReading {
  x: number;
  y: number;
}

interface PlotProps extends WithStyles<typeof styles> {
  data: SensorReading[];
  legend: string;
  stateCode: string;
  tickSetting: string;
}

const SensorChart: React.FunctionComponent<PlotProps> = (props) => {
  const { classes, legend, stateCode, tickSetting } = props;
  const theme = useTheme();
  const [hover, setHover] = useState<boolean>(false);
  const [series, setSeries] = useState<Serie[]>([]);
  const [minY, setMinY] = useState(0);
  const [maxY, setMaxY] = useState(0);

  const light = theme.palette.primary.main;
  const dark = theme.palette.primary.dark;

  const chartTheme = useCallback(() => {
    return {
      grid: {
        line: {
          stroke: "rgba(0,0,0,0.05)",
        },
      },
      axis: {
        legend: {
          text: {
            fill: hover ? light : dark,
            fontSize: 12,
          },
        },
        ticks: {
          text: {
            fill: "rgba(0,0,0,0.3)",
            fontSize: 12,
          },
          line: {
            stroke: "rgba(0,0,0,0.3)",
            strokeWidth: 1,
          },
        },
        domain: {
          line: {
            stroke: "rgba(0,0,0,0.1)",
            strokeWidth: 1,
          },
        },
      },
      crosshair: {
        line: {
          stroke: "rgba(0,0,0,0.5)",
          strokeWidth: 1,
          strokeOpacity: 0.35,
        },
      },
    };
  }, [hover]);

  useEffect(() => {
    setSeries([
      {
        id: legend,
        data: props.data,
      },
    ]);

    let yValues = props.data.map((d) => d.y);
    let minValue = yValues.reduce((v1, v2) => (v1 > v2 ? v2 : v1));
    let maxValue = yValues.reduce((v1, v2) => (v1 > v2 ? v1 : v2));
    setMinY(minValue - getStdDeviation(yValues) / 3);
    setMaxY(maxValue + getStdDeviation(yValues) / 3);
  }, [props.data]);

  const yScale = useCallback((): Scale => {
    return {
      type: "linear",
      min: minY,
      max: maxY,
    };
  }, [minY, maxY]);

  let margin = {
    top: 30,
    right: 10,
    bottom: 60,
    left: 50,
  };

  return (
    <div
      className={classes.chartRoot}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ResponsiveLine
        curve={"monotoneX"}
        data={series}
        theme={chartTheme()}
        colors={[hover ? light : dark]}
        // enableGridY={hover}
        // enableGridX={hover}
        // enableGridY={false}
        // enableGridX={false}
        margin={margin}
        yScale={yScale()}
        xScale={{ type: "point" }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          format: (values) => formatDate(values, tickSetting),
          // format: (values) => format(values),
          legendOffset: -250,
          legend: `${legend} - ${stateCode}`,
          legendPosition: "start",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
        }}
        lineWidth={1}
        useMesh={true}
        crosshairType="cross"
        tooltip={({ point }: PointTooltipProps) => {
          return (
            <div className={classes.toolTip}>
              <div style={{ textAlign: "center" }}>
                {getRequiredDateFormat(point.data.x, "MMM-DD")}
              </div>
              <div
                key={point.id}
                style={{
                  color: point.serieColor,
                  padding: "3px 0",
                }}
              >
                <strong>{point.serieId}</strong>: {point.data.yFormatted}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default withStyles(styles)(SensorChart);
