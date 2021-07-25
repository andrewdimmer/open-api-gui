import React, { Fragment } from "react";
import { supportedOpenApiSpecificationVersions } from "../../data/openApiData";
import StringDropdownSelectionForm from "../inputForms/stringForms/StringDropdownSelectionForm";
import { HelpfulHint } from "../misc/NoteTemplates";

declare interface OpenApiSpecificationVersionUiProps {
  openapi: string;
  setOpenapi: (openapi: string) => void;
}

const OpenApiSpecificationVersionUi: React.FunctionComponent<OpenApiSpecificationVersionUiProps> =
  ({ openapi, setOpenapi }) => {
    return (
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
            that the OpenAPI document uses. This field SHOULD be used by tooling
            specifications and clients to interpret the OpenAPI document. This
            is <em>not</em> related to the API version in the "Basic API
            Information" section.
          </Fragment>
        }
        notes={[
          <HelpfulHint>
            Start by defining you OpenAPI Specification with 3.1.0. This has
            some extra feature, which make it easier to use and more
            standardized with other open source resouces (like JSON Schema). If
            you do need to later convert back down to 3.0.3 to use another tool,
            OpenAPI GUI can do so without data loss is most cases, and it will
            highligh areas to repair if data loss does occur. Then, if you want
            to convert back to 3.1.0 from 3.0.3, all of the additional
            information you added for the new version will still be waiting for
            you when you upgrade it back to 3.1.0.
          </HelpfulHint>,
        ]}
        label="OpenAPI Version"
        value={openapi}
        setValue={setOpenapi}
        error={!openapi}
        errorHelperText={"OpenAPI Version is required"}
        options={supportedOpenApiSpecificationVersions}
      />
    );
  };

export default OpenApiSpecificationVersionUi;
