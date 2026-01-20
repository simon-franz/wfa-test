# UtilityApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createToken**](UtilityApi.md#createtoken) | **POST** /v2/authentication | Receive Authentication Token |
| [**createWebhooks**](UtilityApi.md#createwebhooksoperation) | **POST** /v2/webhooks | POST Webhooks |
| [**deleteWebhooks**](UtilityApi.md#deletewebhooks) | **DELETE** /v2/webhooks | DELETE Webhooks |
| [**editWebhooks**](UtilityApi.md#editwebhooksoperation) | **PUT** /v2/webhooks | PUT Webhooks |
| [**getEditWebhooksStatus**](UtilityApi.md#geteditwebhooksstatus) | **GET** /v2/webhooks/jobs/{jobId} | GET Webhooks Jobs |
| [**healthCheck**](UtilityApi.md#healthcheck) | **GET** /v2/health-check | GET Health Check |
| [**listWebhooks**](UtilityApi.md#listwebhooks) | **GET** /v2/webhooks | GET Webhooks |



## createToken

> Token createToken(credentials)

Receive Authentication Token

Use your credentials to receive an authorization Bearer token which is required for all subsequent API calls.

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { CreateTokenRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const api = new UtilityApi();

  const body = {
    // Credentials | The credentials created in HR WORKS, consisting of accessKey and secretAccessKey.
    credentials: ...,
  } satisfies CreateTokenRequest;

  try {
    const data = await api.createToken(body);
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
| **credentials** | [Credentials](Credentials.md) | The credentials created in HR WORKS, consisting of accessKey and secretAccessKey. | |

### Return type

[**Token**](Token.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. A new access token was created and is returned to the caller. |  -  |
| **403** | The credentials provided with the request were invalid. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createWebhooks

> JobIdObject createWebhooks(createWebhooksRequest)

POST Webhooks

Create new webhooks in HR WORKS. Refer to the data type WebhookData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { CreateWebhooksOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UtilityApi(config);

  const body = {
    // CreateWebhooksRequest (optional)
    createWebhooksRequest: ...,
  } satisfies CreateWebhooksOperationRequest;

  try {
    const data = await api.createWebhooks(body);
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
| **createWebhooksRequest** | [CreateWebhooksRequest](CreateWebhooksRequest.md) |  | [Optional] |

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


## deleteWebhooks

> JobIdObject deleteWebhooks(numbers)

DELETE Webhooks

Delete multiple webhooks in HR WORKS.

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { DeleteWebhooksRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UtilityApi(config);

  const body = {
    // Array<string> | List of webhook IDs.
    numbers: ...,
  } satisfies DeleteWebhooksRequest;

  try {
    const data = await api.deleteWebhooks(body);
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
| **numbers** | `Array<string>` | List of webhook IDs. | |

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


## editWebhooks

> JobIdObject editWebhooks(editWebhooksRequest)

PUT Webhooks

Edit webhooks in HR WORKS. Refer to the data type WebhookData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { EditWebhooksOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UtilityApi(config);

  const body = {
    // EditWebhooksRequest (optional)
    editWebhooksRequest: ...,
  } satisfies EditWebhooksOperationRequest;

  try {
    const data = await api.editWebhooks(body);
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
| **editWebhooksRequest** | [EditWebhooksRequest](EditWebhooksRequest.md) |  | [Optional] |

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


## getEditWebhooksStatus

> MultiWriteRequestResponse getEditWebhooksStatus(jobId)

GET Webhooks Jobs

After a write request to the /webhooks endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { GetEditWebhooksStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UtilityApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditWebhooksStatusRequest;

  try {
    const data = await api.getEditWebhooksStatus(body);
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


## healthCheck

> healthCheck()

GET Health Check

Check if the API is up and running.

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { HealthCheckRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UtilityApi(config);

  try {
    const data = await api.healthCheck();
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

`void` (Empty response body)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The API is available for further calls. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listWebhooks

> ListWebhooksResponse listWebhooks(onlyActive, resource, action)

GET Webhooks

Lists the webhooks for the company.

### Example

```ts
import {
  Configuration,
  UtilityApi,
} from '@hrworks/auto-client';
import type { ListWebhooksRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UtilityApi(config);

  const body = {
    // boolean | Set this parameter to false to also return webhooks that are inactive. (optional)
    onlyActive: true,
    // WebhookResource | The type of resource to be modified. (optional)
    resource: ...,
    // WebhookAction | The action type that triggers the webhook. (optional)
    action: ...,
  } satisfies ListWebhooksRequest;

  try {
    const data = await api.listWebhooks(body);
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
| **onlyActive** | `boolean` | Set this parameter to false to also return webhooks that are inactive. | [Optional] [Defaults to `true`] |
| **resource** | `WebhookResource` | The type of resource to be modified. | [Optional] [Defaults to `undefined`] [Enum: person, applicant, absence, sickLeave, remoteWork] |
| **action** | `WebhookAction` | The action type that triggers the webhook. | [Optional] [Defaults to `undefined`] [Enum: resourceDeactivated, resourceCreated, resourceDeleted, resourceUpdated] |

### Return type

[**ListWebhooksResponse**](ListWebhooksResponse.md)

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

