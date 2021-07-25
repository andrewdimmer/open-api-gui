import { createStyles, Fab, makeStyles, Theme } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import React, { Fragment } from "react";

declare interface BugReportFabProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: "0px",
      right: "0px",
      margin: theme.spacing(2),
    },
    // To add extra space to the bottom of the webpage so the fab doesn't block the lower right corner of content
    fabSpacing: {
      height: "56px",
      margin: theme.spacing(2),
    },
  })
);

const BugReportFab: React.FunctionComponent<BugReportFabProps> = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.fabSpacing} />
      <Fab
        color="primary"
        onClick={() => {
          window.open(
            "https://github.com/andrewdimmer/open-api-gui/issues",
            "_blank"
          );
        }}
        className={classes.fab}
      >
        <BugReportIcon />
      </Fab>
    </Fragment>
  );
};

export default BugReportFab;
