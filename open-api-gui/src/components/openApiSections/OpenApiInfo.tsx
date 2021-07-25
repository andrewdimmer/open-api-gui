import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import OpenApi from "../../../@types/OpenApiTypes";
import { openSourceLicenseList } from "../../data/openSourceLicenseList";
import {
  clearLicenseDataLoss,
  isLicenseDataLoss,
} from "../../helpers/openApiVersionConverter";
import { validEmail, validUrl } from "../../helpers/stringValidators";
import NumberDropdownSelectionForm from "../inputForms/numberForms/NumberDropdownSelectionForm";
import MarkdownTextFieldForm from "../inputForms/stringForms/MardownTextFieldForm";
import StringTextFieldForm from "../inputForms/stringForms/StringTextFieldForm";
import OpenApiStepCard from "../layouts/OpenApiStepCard";
import {
  DataLossDuringConversion,
  HelpfulHint,
  NewInOpenApi3_1_0,
  NewInOpenApi3_1_0_LossOfInfoIfNeedOpenAoi3_0_3,
} from "../misc/NoteTemplates";

declare interface OpenApiInfoProps {
  openapi: string;
  info: OpenApi.InfoObject;
  setInfo: (info: OpenApi.InfoObject) => void;
}

const OpenApiInfo: React.FunctionComponent<OpenApiInfoProps> = ({
  openapi,
  info,
  setInfo,
}) => {
  const getLicenseIndexFromLicense = (
    license: OpenApi.LicenseObject | undefined
  ) => {
    if (!license) {
      return -1;
    } else {
      for (const indexString in openSourceLicenseList) {
        const index = parseInt(indexString);
        if (
          openSourceLicenseList[index].name === license.name &&
          openSourceLicenseList[index].identifier === license.identifier &&
          openSourceLicenseList[index].url === license.url
        ) {
          return index;
        }
      }
      return -2;
    }
  };

  const [licenseIndex, setLicenseIndex] = React.useState<number>(
    getLicenseIndexFromLicense(info.license)
  );
  const [licenseUrlOrIdentifier, setLicenseUrlOrIdentifier] = React.useState<
    "identifier" | "url"
  >(info.license?.identifier ? "identifier" : "url");

  const noErrors = () => {
    return !(
      !info.title ||
      (!!info.termsOfService && !validUrl(info.termsOfService)) ||
      (!!info.contact?.url && !validUrl(info.contact.url)) ||
      (!!info.contact?.email && !validEmail(info.contact.email)) ||
      (licenseIndex !== -1 && !info.license?.name) ||
      (!!info.license?.url && !validUrl(info.license.url)) ||
      !info.version
    );
  };

  const setTitle = (title: string) => {
    setInfo({ ...info, title });
  };

  const setSummary = (summary: string) => {
    setInfo({ ...info, summary: summary || undefined });
  };

  const setDescription = (description: string) => {
    setInfo({ ...info, description: description || undefined });
  };

  const setTermsOfService = (termsOfService: string) => {
    setInfo({ ...info, termsOfService: termsOfService || undefined });
  };

  const setContact = (contact: OpenApi.ContactObject | undefined) => {
    const hasContent =
      contact && (contact.name || contact.url || contact.email);
    setInfo({ ...info, contact: hasContent ? contact : undefined });
  };

  const setContactName = (contactName: string) => {
    const newContact = info.contact || {};
    setContact({ ...newContact, name: contactName || undefined });
  };

  const setContactUrl = (contactUrl: string) => {
    const newContact = info.contact || {};
    setContact({ ...newContact, url: contactUrl || undefined });
  };

  const setContactEmail = (contactEmail: string) => {
    const newContact = info.contact || {};
    setContact({ ...newContact, email: contactEmail || undefined });
  };

  const setLicense = (license: OpenApi.LicenseObject | undefined) => {
    const hasContent =
      license && (license.name || license.identifier || license.url);
    setInfo({ ...info, license: hasContent ? license : undefined });
    clearLicenseDataLoss();
  };

  const setLicenseIfSelected = (licenseIndex: number) => {
    setLicenseIndex(licenseIndex);
    if (licenseIndex < 0) {
      setLicense(undefined);
    } else {
      setLicense(openSourceLicenseList[licenseIndex]);
    }
  };

  const setLicenseName = (licenseName: string) => {
    const newLicense = info.license || { name: "" };
    setLicense({ ...newLicense, name: licenseName });
  };

  const setLicenseIdentifier = (licenseIdentifier: string) => {
    const newLicense = info.license || { name: "" };
    setLicense({ ...newLicense, identifier: licenseIdentifier || undefined });
  };

  const setLicenseUrl = (licenseUrl: string) => {
    const newLicense = info.license || { name: "" };
    setLicense({ ...newLicense, url: licenseUrl || undefined });
  };

  const setVersion = (version: string) => {
    setInfo({ ...info, version });
  };

  return (
    /* info */
    <OpenApiStepCard
      stepNumber={2}
      stepDescription={
        <Fragment>
          <strong>REQUIRED.</strong> Provides metadata about the API. The
          metadata MAY be used by tooling as required.
        </Fragment>
      }
      canAdvanceToNextStep={noErrors()}
    >
      {/* info.title */}
      <StringTextFieldForm
        heading="API Title"
        description={
          <Fragment>
            <strong>REQUIRED.</strong> The title of the API.
          </Fragment>
        }
        value={info.title}
        setValue={setTitle}
        error={!info.title}
        errorHelperText="API Title is required"
      />

      {/* info.summary ---> Not supported in 3.0.3*/}
      {openapi === "3.1.0" && (
        <StringTextFieldForm
          heading="API Summary"
          description="A short summary of the API."
          notes={[<NewInOpenApi3_1_0 />]}
          value={info.summary || ""}
          setValue={setSummary}
        />
      )}

      {/* info.description */}
      <MarkdownTextFieldForm
        heading="API Description"
        description={
          <Fragment>
            A short description of the API.{" "}
            <a
              href="https://spec.commonmark.org/"
              target="_blank"
              rel="noreferrer noopener"
            >
              CommonMark syntax
            </a>{" "}
            MAY be used for rich text representation.
          </Fragment>
        }
        value={info.description || ""}
        setValue={setDescription}
      />

      {/* info.termsOfService */}
      <StringTextFieldForm
        heading="Terms of Service"
        description="A URL to the Terms of Service for the API. MUST be in the format of a URL."
        value={info.termsOfService || ""}
        setValue={setTermsOfService}
        error={!!info.termsOfService && !validUrl(info.termsOfService)}
        errorHelperText="Terms of Service must be a valid URL"
        type="url"
      />

      {/* info.contact */}
      <Typography variant="h5">Contact Information</Typography>
      <Typography>The contact information for the exposed API.</Typography>
      {/* info.contact.name */}
      <StringTextFieldForm
        headingVariant="h6"
        heading="Contact Name"
        description="The identifying name of the contact person/organization."
        value={info.contact?.name || ""}
        setValue={setContactName}
      />
      {/* info.contact.url */}
      <StringTextFieldForm
        headingVariant="h6"
        heading="Contact URL"
        description="The URL pointing to the contact information. This MUST be in the form of a URL."
        value={info.contact?.url || ""}
        setValue={setContactUrl}
        error={!!info.contact?.url && !validUrl(info.contact.url)}
        errorHelperText="Contact URL must be a valid URL"
        type="url"
      />
      {/* info.contact.email */}
      <StringTextFieldForm
        headingVariant="h6"
        heading="Contact Email"
        description="The email address of the contact person/organization. This MUST be in the form of an email address."
        value={info.contact?.email || ""}
        setValue={setContactEmail}
        error={!!info.contact?.email && !validEmail(info.contact.email)}
        errorHelperText="Contact Email must be a valid email address"
        type="email"
      />

      {/* info.license */}
      <NumberDropdownSelectionForm
        heading="License Information"
        description="The license information for the exposed API."
        label="License"
        value={licenseIndex}
        setValue={setLicenseIfSelected}
        options={[
          {
            label: <em>No License</em>,
            value: -1,
          } as {
            label: React.ReactNode;
            value: number;
          },
        ]
          .concat(
            openSourceLicenseList.map((license, index) => {
              return { label: license.name, value: index };
            })
          )
          .concat({
            label: <em>Manually Enter Another License</em>,
            value: -2,
          })}
      />
      {licenseIndex === -2 && (
        <Fragment>
          {/* info.license.name */}
          <StringTextFieldForm
            headingVariant="h6"
            heading="License Name"
            description={
              <Fragment>
                <strong>REQUIRED.</strong> The license name used for the API.
              </Fragment>
            }
            value={info.license?.name || ""}
            setValue={setLicenseName}
            error={!info.license?.name}
            errorHelperText="License Name is required"
          />
          {/* info.licence.identifier ---> Not supported in 3.0.3*/}
          {openapi === "3.1.0" && (
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Define a license by its URL or its identifier:
              </FormLabel>
              <RadioGroup
                row
                name="license-url-or-identifier"
                value={licenseUrlOrIdentifier}
                onChange={(event) => {
                  const licenseUrlOrIdentifier = (
                    event.target as HTMLInputElement
                  ).value as "identifier" | "url";
                  if (licenseUrlOrIdentifier === "identifier") {
                    setLicenseUrl("");
                  } else {
                    setLicenseIdentifier("");
                  }
                  setLicenseUrlOrIdentifier(licenseUrlOrIdentifier);
                }}
              >
                <FormControlLabel
                  value="url"
                  control={<Radio color="primary" />}
                  label="URL"
                />
                <FormControlLabel
                  value="identifier"
                  control={<Radio color="primary" />}
                  label="Identifier"
                />
              </RadioGroup>
            </FormControl>
          )}
          {openapi === "3.1.0" && licenseUrlOrIdentifier === "identifier" ? (
            <Fragment>
              <StringTextFieldForm
                headingVariant="h6"
                heading="License Identifier"
                description={
                  <Fragment>
                    An{" "}
                    <a
                      href="https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      SPDX license
                    </a>{" "}
                    expression for the API. The License Identifier is mutually
                    exclusive of the License URL.
                  </Fragment>
                }
                notes={[
                  <NewInOpenApi3_1_0_LossOfInfoIfNeedOpenAoi3_0_3>
                    Using the License Identifier may result in loss of data when
                    converting from OpenAPI 3.1.0 to OpenAPI 3.0.3. If you still
                    rely on tools that require OpenAPI 3.0.3, it is recommended
                    you use the License URL instead.
                  </NewInOpenApi3_1_0_LossOfInfoIfNeedOpenAoi3_0_3>,
                ]}
                value={info.license?.identifier || ""}
                setValue={setLicenseIdentifier}
              />
            </Fragment>
          ) : (
            <Fragment>
              {/* info.licence.url */}
              <StringTextFieldForm
                headingVariant="h6"
                heading="License URL"
                description="A URL to the license used for the API. This MUST be in the form of a URL. The License URL is mutually exclusive of the License Identifier."
                notes={
                  isLicenseDataLoss()
                    ? [
                        <DataLossDuringConversion>
                          During the convesion from OpenAPI 3.1.0 to OpenAPI
                          3.0.3, it was detected that information in the License
                          Identifier was lost. You can either restore this data
                          by converting back to OpenAPI 3.1.0, or you can edit
                          the license information listed here. If you edit the
                          license information listed here, the new information
                          will be carried forward to OpenAPI 3.1.0 if you ever
                          upgrade it again.
                        </DataLossDuringConversion>,
                      ]
                    : []
                }
                value={info.license?.url || ""}
                setValue={setLicenseUrl}
                error={!!info.license?.url && !validUrl(info.license.url)}
                errorHelperText="License URL must be a valid URL"
                type="url"
              />
            </Fragment>
          )}
        </Fragment>
      )}

      {/* info.version */}
      <StringTextFieldForm
        heading="OpenAPI Document Version"
        description={
          <Fragment>
            <strong>REQUIRED.</strong> The version of the OpenAPI document
            (which is distinct from the OpenAPI Specification version or the API
            implementation version).
          </Fragment>
        }
        notes={[
          <HelpfulHint>
            Helpful Hint to New Hackers: When in doubt for creating a version
            number, it is generally pretty safe to default to{" "}
            <a
              href="https://semver.org/spec/v2.0.0.html"
              target="_blank"
              rel="noreferrer noopener"
            >
              semantic versioning
            </a>
            . If you haven't already learned about this, now is a great time to
            check it out!
          </HelpfulHint>,
        ]}
        value={info.version}
        setValue={setVersion}
        error={!info.version}
        errorHelperText="OpenAPI Document Version is required"
      />
    </OpenApiStepCard>
  );
};

export default OpenApiInfo;
