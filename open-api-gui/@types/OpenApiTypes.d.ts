// Created from https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md
declare namespace OpenApi {
  interface Object {
    openapi: string;
    info: InfoObject;
    jsonSchemaDialect?: string;
    servers?: ServerObject[];
    paths: PathsObject;
    webhooks: { [key: string]: PathItemObject | ReferenceObject };
    components?: ComponentsObject;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;
  }

  interface InfoObject {
    title: string;
    summary?: string;
    description?: string;
    termsOfService?: string;
    contact?: ContactObject;
    license?: LicenseObject;
    version: string;
  }

  interface ContactObject {
    name?: string;
    url?: string;
    email?: string;
  }

  interface LicenseObject {
    name: string;
    identifier?: string;
    url?: string;
  }

  interface ServerObject {
    url: string;
    description?: string;
    variables?: { [key: string]: ServerVariableObject };
  }

  interface ServerVariableObject {
    enum?: string[];
    default: string;
    description?: string;
  }

  interface ComponentsObject {
    schemas?: { [key: string]: SchemaObject };
    responses?: { [key: string]: ResponseObject | ReferenceObject };
    parameters?: { [key: string]: ParameterObject | ReferenceObject };
    examples?: { [key: string]: ExampleObject | ReferenceObject };
    requestBodies?: { [key: string]: RequestBodyObject | ReferenceObject };
    headers?: { [key: string]: HeaderObject | ReferenceObject };
    securitySchemes?: { [key: string]: SecuritySchemeObject | ReferenceObject };
    links?: { [key: string]: LinkObject | ReferenceObject };
    callbacks?: { [key: string]: CallbackObject | ReferenceObject };
    pathItems?: { [key: string]: PathItemObject | ReferenceObject };
  }

  type PathsObject = { [key: string]: PathItemObject };

  interface PathItemObject {
    $ref?: string;
    summary?: string;
    description?: string;
    get?: OperationObject;
    put?: OperationObject;
    post?: OperationObject;
    delete?: OperationObject;
    options?: OperationObject;
    head?: OperationObject;
    patch?: OperationObject;
    trace?: OperationObject;
    servers?: ServerObject[];
    parameters?: (ParameterObject | ReferenceObject)[];
  }

  interface OperationObject {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    operationId?: string;
    parameters?: (ParameterObject | ReferenceObject)[];
    requestBody?: RequestBodyObject | ReferenceObject;
    responses: ResponsesObject;
    callback?: { [key: string]: CallbackObject | ReferenceObject };
    deprecated?: boolean;
    security?: SecurityRequirementObject[];
    servers?: ServerObject[];
  }

  interface ExternalDocumentationObject {
    description?: string;
    url: string;
  }

  interface ParameterObject {
    name: string;
    in: "query" | "header" | "path" | "cookie";
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: StyleValues;
    explode?: boolean;
    allowReserved?: boolean;
    schema?: SchemaObject;
    example?: any;
    examples?: { [key: string]: ExampleObject | ReferenceObject };
    content?: { [key: string]: MediaTypeObject };
  }

  type StyleValues =
    | "matrix"
    | "label"
    | "form"
    | "simple"
    | "spaceDelimited"
    | "pipeDelimited"
    | "deepObject";

  interface RequestBodyObject {
    description?: string;
    content: { [key: string]: MediaTypeObject };
    required?: boolean;
  }

  interface MediaTypeObject {
    schema?: SchemaObject;
    example?: any;
    examples?: { [key: string]: ExampleObject | ReferenceObject };
    encoding?: { [key: string]: EncodingObject };
  }

  interface EncodingObject {
    contentType?: string;
    headers?: { [key: string]: HeaderObject | ReferenceObject };
    style?: StyleValues;
    explode?: boolean;
    allowReserved?: boolean;
  }

  type ResponsesObject = { [key: string]: ResponseObject | ReferenceObject };

  interface ResponseObject {
    description: string;
    headers?: { [key: string]: HeaderObject | ReferenceObject };
    content?: { [key: string]: MediaTypeObject };
    links?: { [key: string]: LinkObject | ReferenceObject };
  }

  type CallbackObject = { [key: string]: PathItemObject | ReferenceObject };

  interface ExampleObject {
    summary?: string;
    description?: string;
    value?: any;
    externalValue?: string;
  }

  interface LinkObject {
    operationRef?: string;
    operationId?: string;
    parameters?: { [key: string]: any };
    requestBody?: any;
    description?: string;
    server?: ServerObject;
  }

  interface HeaderObject {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: StyleValues;
    explode?: boolean;
    allowReserved?: boolean;
    schema?: SchemaObject;
    example?: any;
    examples?: { [key: string]: ExampleObject | ReferenceObject };
    content?: { [key: string]: MediaTypeObject };
  }

  interface TagObject {
    name: string;
    description?: string;
    externalDocs: ExternalDocumentationObject;
  }

  interface ReferenceObject {
    $ref: string;
    summary?: string;
    description?: string;
  }

  interface SchemaObject {
    // Generated from https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00
    // 8.1. Meta-Schemas and Vocabularies
    $schema?: string;
    $vocabulary?: { [key: string]: boolean };
    // 8.2. Base URI, Anchors, and Dereferencing
    $id?: string;
    $anchor?: string;
    $dynamicAnchor?: string;
    $ref?: string;
    $dynamicRef?: string;
    $defs?: string;
    // 8.3.  Comments With "$comment"
    $comment?: string;
    // 10.2.1. Keywords for Applying Subschemas With Logic
    allOf?: SchemaObject[];
    anyOf?: SchemaObject[];
    oneOf?: SchemaObject[];
    not?: SchemaObject;
    // 10.2.2. Keywords for Applying Subschemas Conditionally
    if?: SchemaObject;
    then?: SchemaObject;
    else?: SchemaObject;
    dependentSchemas?: { [key: string]: SchemaObject };
    // 10.3.1. Keywords for Applying Subschemas to Arrays
    prefixItems?: SchemaObject[];
    items?: SchemaObject;
    contains?: SchemaObject;
    // 10.3.2. Keywords for Applying Subschemas to Objects
    properties?: { [key: string]: SchemaObject };
    patternProperties?: { [key: string]: string };
    additionalProperties?: SchemaObject;
    propertyNames?: SchemaObject;
    // 11. A Vocabulary for Unevaluated Locations
    unevaluatedItems?: SchemaObject;
    unevaluatedProperties?: SchemaObject;
    // Generated from https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00
    // 6.1. Validation Keywords for Any Instance Type
    type?: string | string[];
    enum?: any[];
    const?: any;
    // 6.2. Validation Keywords for Numeric Instances (number and integer)
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    // 6.3. Validation Keywords for Strings
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    // 6.4. Validation Keywords for Arrays
    maxItem?: number;
    minItems?: number;
    uniqueItems?: number;
    maxContains?: number;
    minContains?: number;
    // 6.5. Validation Keywords for Objects
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    dependentsRequired?: { [key: string]: string[] };
    // 7. Vocabularies for Semantic Content With "format"
    format: string; //TODO: Restrict this later?
    // 8. A Vocabulary for the Contents of String-Encoded Data
    contentEncoding?: string;
    contentMediaType?: string; //TODO: Restrict this later?
    contentSchema?: SchemaObject;
    // 9. A Vocabulary for Basic Meta-Data Annotations
    title?: string;
    description?: string;
    default?: any;
    deprecated?: boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: any[];
    // Specific to OpenAPI from https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#fixed-fields-20
    discriminator?: DiscriminatorObject;
    xml?: XmlObject;
    externalDocs?: ExternalDocumentationObject;
  }

  interface DiscriminatorObject {
    propertyName: string;
    mapping: { [key: string]: string };
  }

  interface XmlObject {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
  }

  interface SecuritySchemeObject {
    type: "apiKey" | "http" | "mutualTLS" | "oauth2" | "openIdConnect";
    description?: string;
    name?: string;
    in?: "query" | "header" | "cookie";
    scheme?: string;
    bearerFormat?: string;
    flows?: OAuthFlowsObject;
    openIdConnectUrl?: string;
  }

  interface OAuthFlowsObject {
    implict?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
  }

  interface OAuthFlowObject {
    authorizationUrl: string;
    tokenUrl: string;
    refreshUrl?: string;
    scopes: string;
  }

  type SecurityRequirementObject = { [key: string]: string[] };
}
