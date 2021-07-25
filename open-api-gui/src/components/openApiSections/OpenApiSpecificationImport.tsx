import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import OpenApi from "../../../@types/OpenApiTypes";
import { openApiSteps } from "../../data/openApiSteps";
import OpenApiStepCard from "../layouts/OpenApiStepCard";
import { markdownSyntaxHighlightingComponents } from "../misc/MarkdownPreviewTextField";

declare interface OpenApiSpecificationImportExportProps {
  openApiSpecification: OpenApi.Object;
  setOpenApiSpecification: (openApiSpecification: OpenApi.Object) => void;
  operation: "import" | "export";
}

const OpenApiSpecificationImportExport: React.FunctionComponent<OpenApiSpecificationImportExportProps> =
  ({ openApiSpecification, setOpenApiSpecification, operation }) => {
    const [editValue, setEditValue] = React.useState<string>(
      JSON.stringify(openApiSpecification, null, 2)
    );
    const [isValidJson, setIsValidJson] = React.useState<boolean>(true);

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
              <br />
              <br />
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              Copy and paste the below OpenAPI Specification to wherever you are
              going to use it. If you're not already familiar with how to
              generate documentation, clients, and servers from the below
              OpenAPI Specification, check out{" "}
              <a
                href="https://editor.swagger.io"
                target="_blank"
                rel="noreferrer noopener"
              >
                editor.swagger.io
              </a>
              .
              <br />
              <br />
              If you want to make any edits the the JSON below, feel free to do
              that as well. If you head back into the OpenAPI GUI by clicking
              "Previous" or "Home" then "Get Started!", the new values you've
              edited here will be ready for you in the GUI as well.
              <br />
              <br />
            </Fragment>
          )
        }
        canAdvanceToNextStep={isValidJson}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption">Edit:</Typography>
            <TextField
              error={!isValidJson}
              fullWidth={true}
              helperText={
                !isValidJson && (
                  <Fragment>
                    <Error fontSize="inherit" /> Please ensure that you enter a
                    valid JSON OpenAPI Schema. If you don't already have one,
                    you can get started with just "<code>{"{}"}</code>".
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
                  setEditValue(JSON.stringify(openApiSpecification, null, 2));
                }}
                variant="outlined"
              >
                Format JSON
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </OpenApiStepCard>
    );
  };

export default OpenApiSpecificationImportExport;
