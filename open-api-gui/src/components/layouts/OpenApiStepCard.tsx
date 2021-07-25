import { Button, Card, Container, Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { openApiSteps, stepNumberToRoute } from "../../data/openApiData";
import { styles } from "../../styles";
import { useHistory } from "react-router";

declare interface OpenApiStepCardProps {
  stepNumber: number;
  stepDescription?: React.ReactNode;
  canAdvanceToNextStep: boolean;
}

const OpenApiStepCard: React.FunctionComponent<OpenApiStepCardProps> = ({
  stepNumber,
  stepDescription,
  canAdvanceToNextStep,
  children,
}) => {
  const classes = styles();
  const routeHistory = useHistory();

  const NavigationButton = (
    label: string,
    route: string,
    disabled?: boolean
  ) => {
    return (
      <Button
        color="primary"
        disabled={disabled}
        onClick={() => {
          routeHistory.push(route);
          window.scrollTo(0, 0);
        }}
        variant="contained"
      >
        {label}
      </Button>
    );
  };

  const PreviousStep = () =>
    NavigationButton(
      `Previous: ${openApiSteps[stepNumber - 1]}`,
      stepNumberToRoute(stepNumber - 1)
    );

  const NextStep = () =>
    NavigationButton(
      `Next: ${openApiSteps[stepNumber + 1]}`,
      stepNumberToRoute(stepNumber + 1),
      !canAdvanceToNextStep
    );

  const HomeButton = () => NavigationButton("Home", "/");

  return (
    <Fragment>
      <Card className={classes.marginedPadded}>
        <Typography variant="h3" className={classes.pageTitle}>
          {openApiSteps[stepNumber]}
        </Typography>
        <Typography>{stepDescription}</Typography>
        {children}
      </Card>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6} container justifyContent="flex-start">
            {stepNumber !== 0 ? PreviousStep() : HomeButton()}
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            {stepNumber !== openApiSteps.length - 1 ? NextStep() : HomeButton()}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default OpenApiStepCard;
