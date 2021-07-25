import React, { Fragment } from "react";
import StringDropdownSelectionForm from "../inputForms/stringForms/StringDropdownSelectionForm";
import OpenApiStepCard from "../layouts/OpenApiStepCard";
import { NewInOpenApi3_1_0 } from "../misc/NoteTemplates";
import OpenApiSpecificationVersionUi from "../openApiObjectUis/OpenApiSpecificationVersionUi";

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
        <OpenApiSpecificationVersionUi
          openapi={openapi}
          setOpenapi={setOpenapi}
        />

        {/* jsonSchemaDialect ---> Not supported in 3.0.3*/}
        {openapi === "3.1.0" && (
          <StringDropdownSelectionForm
            heading="OpenAPI JSON Schema Dialect"
            description={
              <Fragment>
                The default value for the <code>$schema</code> keyword within
                Schema Objects contained within this OpenApi Specification
                document. This MUST be in the form of a URI.
              </Fragment>
            }
            notes={[<NewInOpenApi3_1_0 />]}
            value={jsonSchemaDialect}
            setValue={setJsonSchemaDialect}
            options={[
              {
                label: "OpenAPI 3.1 Schema Dialect",
                value: "https://spec.openapis.org/oas/3.1/dialect/base",
              },
            ]}
          />
        )}
      </OpenApiStepCard>
    );
  };

export default OpenApiConfiguration;
