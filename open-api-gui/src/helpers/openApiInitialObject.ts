import OpenApi from "../../@types/OpenApiTypes";

export const generateOpenApiInitialObject = (
  version: string = "3.1.0"
): OpenApi.Object => {
  return version === "3.1.0"
    ? generateOpenApiInitialObject_OpenAPI_3_1_0()
    : version === "3.0.3"
    ? generateOpenApiInitialObject_OpenAPI_3_0_3()
    : generateOpenApiInitialObject_Unknwon();
};

const generateOpenApiInitialObject_OpenAPI_3_0_3 = (): OpenApi.Object => {
  return {
    openapi: "3.0.3",
    info: { title: "", version: "" },
    paths: {},
  };
};

const generateOpenApiInitialObject_OpenAPI_3_1_0 = (): OpenApi.Object => {
  return {
    openapi: "3.1.0",
    info: { title: "", version: "" },
    jsonSchemaDialect: "https://spec.openapis.org/oas/3.1/dialect/base",
  };
};

const generateOpenApiInitialObject_Unknwon = (): OpenApi.Object => {
  return {
    openapi: "",
    info: { title: "", version: "" },
  };
};
