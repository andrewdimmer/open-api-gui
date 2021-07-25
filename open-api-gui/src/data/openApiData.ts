export const openApiSteps: string[] = [
  "Import Existing OpenAPI Specification",
  "OpenAPI Sepecification Configuration",
  "Basic API Information",
  "Configure API Servers",
  "Export OpenAPI Specification",
];

export const stepNumberToRoute = (stepNumber: number) => {
  return openApiSteps[stepNumber].toLowerCase().replaceAll(" ", "-");
};

export const supportedOpenApiSpecificationVersions = [
  { label: "3.0.3", value: "3.0.3" },
  { label: "3.1.0", value: "3.1.0" },
];
