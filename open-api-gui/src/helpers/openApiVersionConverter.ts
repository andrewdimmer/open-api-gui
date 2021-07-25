import OpenApi from "../../@types/OpenApiTypes";
import { NotificationMessage } from "../components/misc/Notifications";

// Data storage to store extra fields in new version
let jsonSchemaDialect: string | undefined;
let info_summary: string | undefined;
let info_license: OpenApi.LicenseObject | undefined;

// Data loss flags

let dataLoss: string[] = [];

export const isDataLoss = () => {
  return dataLoss.length > 0;
};

export const isLicenseDataLoss = () => {
  return dataLoss.includes("info_license");
};

export const markLicenseDataLoss = () => {
  if (!isLicenseDataLoss()) {
    dataLoss.push("info_license");
  }
};

export const clearLicenseDataLoss = () => {
  if (isLicenseDataLoss()) {
    dataLoss.splice(dataLoss.indexOf("info_license"), 1);
  }
};

// Coverters

export const convertOpenApiSpecification = (
  openApiSpecification: OpenApi.Object,
  destination: string
) => {
  if (destination === "3.0.3") {
    return convertOpenApiSpecification3_1_0To3_0_3(openApiSpecification);
  } else if (destination === "3.1.0") {
    return convertOpenApiSpecification3_0_3To3_1_0(openApiSpecification);
  } else {
    return {
      newSpecification: openApiSpecification,
      status: {
        type: "warning",
        message: "Unable to automatically convert OpenAPI Specification",
      } as NotificationMessage,
    };
  }
};

const convertOpenApiSpecification3_0_3To3_1_0 = (
  openApiSpecification: OpenApi.Object
) => {
  const newSpecification = { ...openApiSpecification };

  // jsonSchemaDialect
  newSpecification.jsonSchemaDialect = jsonSchemaDialect || undefined;

  // info.summary
  newSpecification.info.summary = info_summary || undefined;

  // info.license
  if (isLicenseDataLoss()) {
    newSpecification.info.license = info_license;
    clearLicenseDataLoss();
  }

  // paths
  let pathsHasContent = false;
  for (const _ in newSpecification.paths) {
    pathsHasContent = true;
    break;
  }
  if (!pathsHasContent) {
    newSpecification.paths = undefined;
  }

  return {
    newSpecification,
    status: isDataLoss()
      ? ({
          type: "warning",
          message:
            "Successfully converted from OpenAPI 3.0.3 to OpenAPI 3.1.0, but data loss occurred during the conversion. Be sure to check over each page on the OpenAPI GUI for more information.",
        } as NotificationMessage)
      : ({
          type: "success",
          message:
            "Successfully converted from OpenAPI 3.0.3 to OpenAPI 3.1.0. No data loss occurred during the conversion.",
        } as NotificationMessage),
  };
};

const convertOpenApiSpecification3_1_0To3_0_3 = (
  openApiSpecification: OpenApi.Object
) => {
  const newSpecification = { ...openApiSpecification };

  // jsonSchemaDialect
  jsonSchemaDialect = newSpecification.jsonSchemaDialect;
  newSpecification.jsonSchemaDialect = undefined;

  // info.summary
  info_summary = newSpecification.info.summary;
  newSpecification.info.summary = undefined;

  // info.license
  if (newSpecification.info.license?.identifier) {
    info_license = { ...newSpecification.info.license };
    newSpecification.info.license.identifier = undefined;
    markLicenseDataLoss();
  }

  // paths
  if (newSpecification.paths === undefined) {
    newSpecification.paths = {};
  }

  return {
    newSpecification,
    status: isDataLoss()
      ? ({
          type: "warning",
          message:
            "Successfully converted from OpenAPI 3.1.0 to OpenAPI 3.0.3, but data loss occurred during the conversion. Be sure to check over each page on the OpenAPI GUI for more information.",
        } as NotificationMessage)
      : ({
          type: "success",
          message:
            "Successfully converted from OpenAPI 3.1.0 to OpenAPI 3.0.3. No data loss occurred during the conversion.",
        } as NotificationMessage),
  };
};
