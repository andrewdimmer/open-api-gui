import React, { Fragment } from "react";
import StringDropdownSelectionForm from "../inputForms/stringForms/StringDropdownSelectionForm";
import OpenApiStepCard from "../layouts/OpenApiStepCard";

declare interface OpenApiConfigurationProps {
  openapi: string;
  setOpenapi: (openapi: string) => void;
  jsonSchemaDialect: string;
  setJsonSchemaDialect: (jsonSchemaDialect: string) => void;
}

const OpenApiConfiguration: React.FunctionComponent<OpenApiConfigurationProps> =
  ({ openapi, setOpenapi, jsonSchemaDialect, setJsonSchemaDialect }) => {
    const noErrors = () => {
      return !!openapi;
    };

    return (
      <OpenApiStepCard stepNumber={1} canAdvanceToNextStep={noErrors()}>
        {/* openapi */}
        <StringDropdownSelectionForm
          heading="OpenAPI Specification Version"
          description={
            <Fragment>
              <strong>REQUIRED.</strong> This string MUST be the{" "}
              <a
                href="https://semver.org/spec/v2.0.0.html"
                target="_blank"
                rel="noreferrer noopener"
              >
                semantic version number
              </a>{" "}
              of the{" "}
              <a
                href="https://swagger.io/specification/#versions"
                target="_blank"
                rel="noreferrer noopener"
              >
                OpenAPI Specification version
              </a>{" "}
              that the OpenAPI document uses. This field SHOULD be used by
              tooling specifications and clients to interpret the OpenAPI
              document. This is <em>not</em> related to the API version in the
              "Basic API Information" section.
            </Fragment>
          }
          label="OpenAPI Version"
          value={openapi}
          setValue={setOpenapi}
          error={!openapi}
          errorHelperText={"OpenAPI Version is required"}
          options={[{ label: "3.1.0", value: "3.1.0" }]}
        />

        {/* jsonSchemaDialect */}
        <StringDropdownSelectionForm
          heading="OpenAPI JSON Schema Dialect"
          description={
            <Fragment>
              The default value for the <code>$schema</code> keyword within
              Schema Objects contained within this OpenApi Specification
              document. This MUST be in the form of a URI.
            </Fragment>
          }
          value={jsonSchemaDialect}
          setValue={setJsonSchemaDialect}
          options={[
            {
              label: "OpenAPI 3.1 Schema Dialect",
              value: "https://spec.openapis.org/oas/3.1/dialect/base",
            },
          ]}
        />
      </OpenApiStepCard>
    );
  };

export default OpenApiConfiguration;
