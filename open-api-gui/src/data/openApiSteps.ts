export const openApiSteps: string[] = [
  "Import Existing OpenAPI Specification",
  "OpenAPI Sepecification Configuration",
  "Basic API Information",
  "Export OpenAPI Specification",
];

export const stepNumberToRoute = (stepNumber: number) => {
  return openApiSteps[stepNumber].toLowerCase().replaceAll(" ", "-");
};
