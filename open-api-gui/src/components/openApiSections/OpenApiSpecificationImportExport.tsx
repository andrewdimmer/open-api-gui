import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import OpenApi from "../../../@types/OpenApiTypes";
import { openApiSteps } from "../../data/openApiData";
import { styles } from "../../styles";
import OpenApiStepCard from "../layouts/OpenApiStepCard";
import { markdownSyntaxHighlightingComponents } from "../misc/MarkdownPreviewTextField";
import { GenericErrorMessage, HelpfulHint } from "../misc/NoteTemplates";
import OpenApiSpecificationVersionUi from "../openApiObjectUis/OpenApiSpecificationVersionUi";

declare interface OpenApiSpecificationImportExportProps {
  openApiSpecification: OpenApi.Object;
  setOpenApiSpecification: (openApiSpecification: OpenApi.Object) => void;
  operation: "import" | "export";
  setOpenapi?: (openapi: string) => void;
}

const OpenApiSpecificationImportExport: React.FunctionComponent<OpenApiSpecificationImportExportProps> =
  ({
    openApiSpecification,
    setOpenApiSpecification,
    operation,
    setOpenapi,
  }) => {
    const classes = styles();

    const [editValue, setEditValue] = React.useState<string>(
      JSON.stringify(openApiSpecification, null, 2)
    );
    const [isValidJson, setIsValidJson] = React.useState<boolean>(true);
    const [isUpToDate, setIsUpToDate] = React.useState<boolean>(true);

    const loadEditValueFromOpenApiSpecification = () => {
      setEditValue(JSON.stringify(openApiSpecification, null, 2));
    };

    if (!isUpToDate) {
      setIsUpToDate(true);
      loadEditValueFromOpenApiSpecification();
    }

    return (
      <OpenApiStepCard
        stepNumber={operation === "import" ? 0 : openApiSteps.length - 1}
        stepDescription={
          operation === "import" ? (
            <Fragment>
              Enter an existing JSON OpenAPI Specification. If you have an
              existing YAML OpenAPI Specification, you can convert it to JSON at{" "}
              <a
                href="https://editor.swagger.io"
                target="_blank"
                rel="noreferrer noopener"
              >
                editor.swagger.io
              </a>{" "}
              by clicking "File", then "Convert and save as JSON".
              <br />
              <br />
              If you don't already have an OpenAPI Specification, that's fine as
              well! Just click "Next" to get started building one!
            </Fragment>
          ) : (
            <Fragment>
              Copy and paste the below OpenAPI Specification to wherever you are
              going to use it.
            </Fragment>
          )
        }
        canAdvanceToNextStep={isValidJson}
      >
        {operation === "export" && (
          <Fragment>
            <HelpfulHint>
              If you're not already familiar with how to generate documentation,
              clients, and servers from the below OpenAPI Specification, check
              out{" "}
              <a
                href="https://editor.swagger.io"
                target="_blank"
                rel="noreferrer noopener"
              >
                editor.swagger.io
              </a>
              .
            </HelpfulHint>
            <HelpfulHint>
              If you want to make any edits the the JSON below, feel free to do
              that as well. If you head back into the OpenAPI GUI by clicking
              "Previous" or "Home" then "Get Started!", the new values you've
              edited here will be ready for you in the GUI as well.
            </HelpfulHint>
            <HelpfulHint>
              Looking to change the OpenAPI Specification Version to use another
              external tool? You can adjust that at the bottom of this page!
            </HelpfulHint>
          </Fragment>
        )}
        <Grid container spacing={2} className={classes.marginedTopBottom}>
          <Grid item xs={6}>
            <Typography variant="caption">Edit:</Typography>
            <TextField
              error={!isValidJson}
              fullWidth={true}
              helperText={
                !isValidJson && (
                  <Fragment>
                    <Error fontSize="inherit" /> Please ensure that you enter a
                    valid JSON OpenAPI Specification. If you don't already have
                    one, you can get started with just "<code>{"{}"}</code>".
                  </Fragment>
                )
              }
              id={`enter-openapi-specification}`}
              multiline
              onChange={(event) => {
                setEditValue(event.target.value);
                if (
                  event.target.value !== "true" &&
                  event.target.value !== "false" &&
                  event.target.value !== "[]"
                ) {
                  try {
                    const json = JSON.parse(event.target.value);
                    setOpenApiSpecification(json);
                    setIsValidJson(true);
                  } catch (error) {
                    setIsValidJson(false);
                  }
                } else {
                  setIsValidJson(false);
                }
              }}
              value={editValue}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Preview:</Typography>
            <ReactMarkdown components={markdownSyntaxHighlightingComponents}>
              {"``` json\n" + editValue + "\n```"}
            </ReactMarkdown>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item>
              <Button
                color="primary"
                disabled={!isValidJson}
                onClick={() => {
                  loadEditValueFromOpenApiSpecification();
                }}
                variant="outlined"
              >
                Format JSON
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {setOpenapi &&
          (isValidJson ? (
            <OpenApiSpecificationVersionUi
              openapi={openApiSpecification.openapi}
              setOpenapi={(openapi) => {
                setOpenapi(openapi);
                setIsUpToDate(false);
              }}
            />
          ) : (
            <GenericErrorMessage prefix="Warning: ">
              You can only change the OpenAPI Specification Version when there
              is a valid JSON OpenAPI Specification
            </GenericErrorMessage>
          ))}
      </OpenApiStepCard>
    );
  };

export default OpenApiSpecificationImportExport;
