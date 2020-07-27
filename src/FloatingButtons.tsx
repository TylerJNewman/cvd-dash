import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatingButton from "../src/FloatingButton";
import { STATES, RANGES } from "../src/constants";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  floatingButtons: {
    marginTop: theme.spacing(3),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

type Props = {
  setStateCode: () => void;
  setRange: () => void;
};

const FloatingButtons: React.FC<Props> = ({ setStateCode, setRange }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.floatingButtons}>
        {STATES.map((stateCode) => (
          <FloatingButton
            key={stateCode}
            name={stateCode}
            onClick={() => setStateCode(stateCode)}
          />
        ))}
      </div>
      <div className={classes.floatingButtons}>
        {RANGES.map(({ name, value }) => (
          <FloatingButton
            key={name}
            name={name}
            onClick={() => setRange(value)}
          />
        ))}
      </div>
    </>
  );
};

export default FloatingButtons;
