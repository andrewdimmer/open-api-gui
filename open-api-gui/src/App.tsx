import { Container } from "@material-ui/core";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OpenApi from "../@types/OpenApiTypes";
import NavBar from "./components/layouts/NavBar";
import BugReportFab from "./components/misc/BugReportFab";
import NotificationBar, {
  NotificationMessage,
} from "./components/misc/Notifications";
import OpenApiConfiguration from "./components/openApiSections/OpenApiConfiguration";
import OpenApiInfo from "./components/openApiSections/OpenApiInfo";
import OpenApiSpecificationImportExport from "./components/openApiSections/OpenApiSpecificationImport";
import Error404Page from "./components/pages/Error404Page";
import Home from "./components/pages/Home";
import { openApiSteps, stepNumberToRoute } from "./data/openApiSteps";
import { generateOpenApiInitialObject } from "./helpers/openApiInitialObject";
import { styles } from "./styles";

declare interface AppProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const App: React.FunctionComponent<AppProps> = ({ theme, toggleTheme }) => {
  const classes = styles();

  const [notification, setNotification] =
    React.useState<NotificationMessage>(null);

  const [openApiSpecification, setOpenApiSpecification] =
    React.useState<OpenApi.Object>(generateOpenApiInitialObject());

  const setOpenapi = (openapi: string) => {
    setOpenApiSpecification({ ...openApiSpecification, openapi });
  };

  const setJsonSchemaDialect = (jsonSchemaDialect: string) => {
    setOpenApiSpecification({ ...openApiSpecification, jsonSchemaDialect });
  };

  const setInfo = (info: OpenApi.InfoObject) => {
    setOpenApiSpecification({ ...openApiSpecification, info });
  };

  return (
    <Router>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <Container className={classes.padded}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path={`/${stepNumberToRoute(0)}`} exact>
            <OpenApiSpecificationImportExport
              openApiSpecification={openApiSpecification}
              setOpenApiSpecification={setOpenApiSpecification}
              operation="import"
            />
          </Route>
          <Route path={`/${stepNumberToRoute(1)}`} exact>
            <OpenApiConfiguration
              openapi={openApiSpecification.openapi}
              setOpenapi={setOpenapi}
              jsonSchemaDialect={openApiSpecification.jsonSchemaDialect || ""}
              setJsonSchemaDialect={setJsonSchemaDialect}
            />
          </Route>
          <Route path={`/${stepNumberToRoute(2)}`} exact>
            {openApiSpecification.info !== undefined ? (
              <OpenApiInfo info={openApiSpecification.info} setInfo={setInfo} />
            ) : (
              () => {
                // Repair bad starting JSON that is allowable when importing `{}`
                setInfo({ title: "", version: "" });
                return <Fragment />;
              }
            )}
          </Route>
          <Route path={`/${stepNumberToRoute(openApiSteps.length - 1)}`} exact>
            <OpenApiSpecificationImportExport
              openApiSpecification={openApiSpecification}
              setOpenApiSpecification={setOpenApiSpecification}
              operation="export"
            />
          </Route>
          <Route component={Error404Page} />
        </Switch>
      </Container>
      <NotificationBar
        notification={notification}
        setNotification={setNotification}
      />
      <BugReportFab />
    </Router>
  );
};

export default App;
