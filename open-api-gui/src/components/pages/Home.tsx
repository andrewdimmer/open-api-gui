import { Button, Card, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { stepNumberToRoute } from "../../data/openApiSteps";
import { styles } from "../../styles";

const Home: React.FunctionComponent = () => {
  const classes = styles();
  const routeHistory = useHistory();

  return (
    <Card className={classes.marginedPadded}>
      <Typography variant="h3" className={classes.pageTitle}>
        Welcome to OpenAPI GUI
      </Typography>

      <Button
        color="primary"
        fullWidth
        onClick={() => {
          routeHistory.push(stepNumberToRoute(0));
          window.scrollTo(0, 0);
        }}
        size="large"
        variant="contained"
      >
        <Typography variant="h5">Get Started!</Typography>
      </Button>
    </Card>
  );
};

export default Home;
