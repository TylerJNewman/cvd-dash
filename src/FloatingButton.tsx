import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

type Props = {
  name: string;
  /** callback function passed to the onClick handler*/
  onClick: () => void;
};

const FloatingButton: React.FC<Props> = ({ name, onClick }) => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={onClick}
        >
          {name}
        </Fab>
      </div>
    </div>
  );
};

export default FloatingButton;
