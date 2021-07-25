import { Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { darkTheme as dark, lightTheme as light } from "./theme";

// Evaluate these styles and see what ones we still want/need
export const styles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
    margined: {
      margin: theme.spacing(2),
    },
    marginedTopBottom: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    marginedPadded: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
    pageTitle: {
      textAlign: "center",
      marginBottom: theme.spacing(2),
    },
    hintIcon: {
      fill: theme.palette.success.main,
    },
    infoIcon: {
      fill: theme.palette.info.main,
    },
    warningIcon: {
      fill: theme.palette.warning.main,
    },
    errorIcon: {
      fill: theme.palette.error.main,
    },
  })
);

export const lightTheme = light;
export const darkTheme = dark;
