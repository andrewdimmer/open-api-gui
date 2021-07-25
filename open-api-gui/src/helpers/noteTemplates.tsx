import { Grid, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import React, { Fragment } from "react";
import { styles } from "../styles";

const noteTemplate = (
  icon: JSX.Element,
  prefix: string,
  message: React.ReactNode,
  className?: string
) => {
  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        className={className}
        wrap="nowrap"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Grid item>{icon}</Grid>
        <Grid item>
          <Typography>
            <strong>{prefix}</strong> {message}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export const helpfulHint = (message: React.ReactNode) => {
  const classes = styles();

  return noteTemplate(
    <ChatIcon className={classes.hintIcon} />,
    "Helpful Hint for New Hackers:",
    message
  );
};

export const dataLossDuringConversion = (message: React.ReactNode) => {
  const classes = styles();

  return noteTemplate(
    <ErrorIcon className={classes.errorIcon} />,
    "Possible Data Loss Detected:",
    message
  );
};

export const newInOpenApi3_1_0 = () => {
  const classes = styles();

  return noteTemplate(
    <InfoIcon className={classes.infoIcon} />,
    "New in OpenAPI 3.1.0:",
    "This provides additional information that was not in OpenApi 3.0.3."
  );
};

export const newInOpenApi3_1_0_LossOfInfoIfNeedOpenAoi3_0_3 = (
  message: React.ReactNode
) => {
  const classes = styles();

  return noteTemplate(
    <WarningIcon className={classes.warningIcon} />,
    "New in OpenAPI 3.1.0:",
    message
  );
};
