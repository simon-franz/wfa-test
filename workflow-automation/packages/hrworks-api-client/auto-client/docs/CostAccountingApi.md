# CostAccountingApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCostCenterAssignments**](CostAccountingApi.md#createcostcenterassignmentsoperation) | **POST** /v2/cost-objects/cost-centers/assignments | POST Cost Centers Assignments |
| [**createCostCenters**](CostAccountingApi.md#createcostcentersoperation) | **POST** /v2/cost-objects/cost-centers | POST Cost Centers |
| [**createCostObjectiveAssignments**](CostAccountingApi.md#createcostobjectiveassignmentsoperation) | **POST** /v2/cost-objects/cost-objectives/assignments | POST Cost Objectives Assignments |
| [**createCostObjectives**](CostAccountingApi.md#createcostobjectivesoperation) | **POST** /v2/cost-objects/cost-objectives | POST Cost Objectives |
| [**deleteCostCenters**](CostAccountingApi.md#deletecostcenters) | **DELETE** /v2/cost-objects/cost-centers | DELETE Cost Centers |
| [**deleteCostObjectives**](CostAccountingApi.md#deletecostobjectives) | **DELETE** /v2/cost-objects/cost-objectives | DELETE Cost Objectives |
| [**getEditCostCenterAssignmentsStatus**](CostAccountingApi.md#geteditcostcenterassignmentsstatus) | **GET** /v2/cost-objects/cost-centers/assignments/jobs/{jobId} | GET Cost Centers Assignments Jobs |
| [**getEditCostCentersStatus**](CostAccountingApi.md#geteditcostcentersstatus) | **GET** /v2/cost-objects/cost-centers/jobs/{jobId} | GET Cost Centers Jobs |
| [**getEditCostObjectiveAssignmentsStatus**](CostAccountingApi.md#geteditcostobjectiveassignmentsstatus) | **GET** /v2/cost-objects/cost-objectives/assignments/jobs/{jobId} | GET Cost Objectives Assignments Jobs |
| [**getEditCostObjectiveStatus**](CostAccountingApi.md#geteditcostobjectivestatus) | **GET** /v2/cost-objects/cost-objectives/jobs/{jobId} | GET Cost Objectives Jobs |
| [**listCostCenters**](CostAccountingApi.md#listcostcenters) | **GET** /v2/cost-objects/cost-centers | GET Cost Centers |
| [**listCostObjectives**](CostAccountingApi.md#listcostobjectives) | **GET** /v2/cost-objects/cost-objectives | GET Cost Objectives |



## createCostCenterAssignments

> JobIdObject createCostCenterAssignments(createCostCenterAssignmentsRequest, personIdentifierType)

POST Cost Centers Assignments

Create cost center assignments to persons and/or organization units in HR WORKS. Limits: The maximum number of cost object assignments that can be created with a single API call is 2000.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { CreateCostCenterAssignmentsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // CreateCostCenterAssignmentsRequest | Collection of cost center assignment data.
    createCostCenterAssignmentsRequest: ...,
    // PersonIdentifierType | Specifies the type of personIdentifiers in the request. Default is uuid. (optional)
    personIdentifierType: ...,
  } satisfies CreateCostCenterAssignmentsOperationRequest;

  try {
    const data = await api.createCostCenterAssignments(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createCostCenterAssignmentsRequest** | [CreateCostCenterAssignmentsRequest](CreateCostCenterAssignmentsRequest.md) | Collection of cost center assignment data. | |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of personIdentifiers in the request. Default is uuid. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the corresponding /jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCostCenters

> JobIdObject createCostCenters(createCostCentersRequest, overwriteNames)

POST Cost Centers

Create cost centers in HR WORKS.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { CreateCostCentersOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // CreateCostCentersRequest | Collection of cost center data.
    createCostCentersRequest: ...,
    // boolean | If set to true, existing cost object names will be overwritten if a new cost object with the same number is passed to the API. (optional)
    overwriteNames: true,
  } satisfies CreateCostCentersOperationRequest;

  try {
    const data = await api.createCostCenters(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createCostCentersRequest** | [CreateCostCentersRequest](CreateCostCentersRequest.md) | Collection of cost center data. | |
| **overwriteNames** | `boolean` | If set to true, existing cost object names will be overwritten if a new cost object with the same number is passed to the API. | [Optional] [Defaults to `false`] |

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the corresponding /jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCostObjectiveAssignments

> JobIdObject createCostObjectiveAssignments(createCostObjectiveAssignmentsRequest, personIdentifierType)

POST Cost Objectives Assignments

Create cost objectives assignments to persons and/or organization units in HR WORKS. Limits: The maximum number of cost object assignments that can be created with a single API call is 2000.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { CreateCostObjectiveAssignmentsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // CreateCostObjectiveAssignmentsRequest | Collection of objectives center assignment data.
    createCostObjectiveAssignmentsRequest: ...,
    // PersonIdentifierType | Specifies the type of personIdentifiers in the request. Default is uuid. (optional)
    personIdentifierType: ...,
  } satisfies CreateCostObjectiveAssignmentsOperationRequest;

  try {
    const data = await api.createCostObjectiveAssignments(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createCostObjectiveAssignmentsRequest** | [CreateCostObjectiveAssignmentsRequest](CreateCostObjectiveAssignmentsRequest.md) | Collection of objectives center assignment data. | |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of personIdentifiers in the request. Default is uuid. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the corresponding /jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCostObjectives

> JobIdObject createCostObjectives(createCostObjectivesRequest, overwriteNames)

POST Cost Objectives

Create cost objectives in HR WORKS.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { CreateCostObjectivesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // CreateCostObjectivesRequest | Collection of cost objectives data.
    createCostObjectivesRequest: ...,
    // boolean | If set to true, existing cost object names will be overwritten if a new cost object with the same number is passed to the API. (optional)
    overwriteNames: true,
  } satisfies CreateCostObjectivesOperationRequest;

  try {
    const data = await api.createCostObjectives(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createCostObjectivesRequest** | [CreateCostObjectivesRequest](CreateCostObjectivesRequest.md) | Collection of cost objectives data. | |
| **overwriteNames** | `boolean` | If set to true, existing cost object names will be overwritten if a new cost object with the same number is passed to the API. | [Optional] [Defaults to `false`] |

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the corresponding /jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCostCenters

> JobIdObject deleteCostCenters()

DELETE Cost Centers

Deletes all existing cost centers. Useful to perform before importing new cost objects to get a clean slate to work with.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { DeleteCostCentersRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  try {
    const data = await api.deleteCostCenters();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the corresponding /jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCostObjectives

> JobIdObject deleteCostObjectives()

DELETE Cost Objectives

Deletes all existing cost objectives. Useful to perform before importing new cost objects to get a clean slate to work with.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { DeleteCostObjectivesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  try {
    const data = await api.deleteCostObjectives();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the corresponding /jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditCostCenterAssignmentsStatus

> MultiWriteRequestResponse getEditCostCenterAssignmentsStatus(jobId)

GET Cost Centers Assignments Jobs

After a POST or PUT or DELETE request to the /cost-objects/cost-centers/assignments endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { GetEditCostCenterAssignmentsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditCostCenterAssignmentsStatusRequest;

  try {
    const data = await api.getEditCostCenterAssignmentsStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **jobId** | `string` | The job id of the previous write request. | [Defaults to `undefined`] |

### Return type

[**MultiWriteRequestResponse**](MultiWriteRequestResponse.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The result can be either pending (containing to response data yet) or finished (containing error or results of the successful write request). |  -  |
| **400** | This error is only returned by /jobs endpoints. The submitted jobId was invalid - no matching write request to the API could be found. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditCostCentersStatus

> GetEditCostCentersStatus200Response getEditCostCentersStatus(jobId)

GET Cost Centers Jobs

After a POST or PUT or DELETE request to the /cost-objects/cost-centers endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { GetEditCostCentersStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditCostCentersStatusRequest;

  try {
    const data = await api.getEditCostCentersStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **jobId** | `string` | The job id of the previous write request. | [Defaults to `undefined`] |

### Return type

[**GetEditCostCentersStatus200Response**](GetEditCostCentersStatus200Response.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The result can be either pending (containing to response data yet) or finished (containing error or results of the successful write request). |  -  |
| **400** | This error is only returned by /jobs endpoints. The submitted jobId was invalid - no matching write request to the API could be found. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditCostObjectiveAssignmentsStatus

> MultiWriteRequestResponse getEditCostObjectiveAssignmentsStatus(jobId)

GET Cost Objectives Assignments Jobs

After a POST or PUT or DELETE request to the /cost-objects/cost-objectives/assignments endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { GetEditCostObjectiveAssignmentsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditCostObjectiveAssignmentsStatusRequest;

  try {
    const data = await api.getEditCostObjectiveAssignmentsStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **jobId** | `string` | The job id of the previous write request. | [Defaults to `undefined`] |

### Return type

[**MultiWriteRequestResponse**](MultiWriteRequestResponse.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The result can be either pending (containing to response data yet) or finished (containing error or results of the successful write request). |  -  |
| **400** | This error is only returned by /jobs endpoints. The submitted jobId was invalid - no matching write request to the API could be found. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditCostObjectiveStatus

> GetEditCostCentersStatus200Response getEditCostObjectiveStatus(jobId)

GET Cost Objectives Jobs

After a POST or PUT or DELETE request to the /cost-objects/cost-objectives endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { GetEditCostObjectiveStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditCostObjectiveStatusRequest;

  try {
    const data = await api.getEditCostObjectiveStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **jobId** | `string` | The job id of the previous write request. | [Defaults to `undefined`] |

### Return type

[**GetEditCostCentersStatus200Response**](GetEditCostCentersStatus200Response.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The result can be either pending (containing to response data yet) or finished (containing error or results of the successful write request). |  -  |
| **400** | This error is only returned by /jobs endpoints. The submitted jobId was invalid - no matching write request to the API could be found. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCostCenters

> ListCostCentersResponse listCostCenters(page)

GET Cost Centers

Lists all cost centers of the company with ID/number and name.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { ListCostCentersRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 10000. (optional)
    page: 8.14,
  } satisfies ListCostCentersRequest;

  try {
    const data = await api.listCostCenters(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 10000. | [Optional] [Defaults to `1`] |

### Return type

[**ListCostCentersResponse**](ListCostCentersResponse.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | successful operation |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCostObjectives

> ListCostObjectivesResponse listCostObjectives(page)

GET Cost Objectives

Lists all cost objectives of the company with ID/number and name.

### Example

```ts
import {
  Configuration,
  CostAccountingApi,
} from '@hrworks/auto-client';
import type { ListCostObjectivesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CostAccountingApi(config);

  const body = {
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 10000. (optional)
    page: 8.14,
  } satisfies ListCostObjectivesRequest;

  try {
    const data = await api.listCostObjectives(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 10000. | [Optional] [Defaults to `1`] |

### Return type

[**ListCostObjectivesResponse**](ListCostObjectivesResponse.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | successful operation |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

