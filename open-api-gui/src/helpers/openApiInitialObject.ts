import OpenApi from "../../@types/OpenApiTypes";

export const generateOpenApiInitialObject = (): OpenApi.Object => {
  return {
    openapi: "3.1.0",
    info: { title: "", version: "" },
    jsonSchemaDialect: "https://spec.openapis.org/oas/3.1/dialect/base",
  };
};
