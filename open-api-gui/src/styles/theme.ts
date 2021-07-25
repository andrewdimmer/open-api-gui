import { createTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const lightTheme = createTheme({
  palette: {
    primary: green,
    secondary: undefined,
    success: undefined,
    error: undefined,
    info: undefined,
    warning: undefined,
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: green,
    secondary: undefined,
    success: undefined,
    error: undefined,
    info: undefined,
    warning: undefined,
  },
});
