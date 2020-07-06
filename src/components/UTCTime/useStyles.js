import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    time: {
      display: "inline-block",
      minWidth: "168px",
      textAlign: "center"
    }
  })
);

export default useStyles;
