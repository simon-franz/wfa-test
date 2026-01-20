# OnboardingApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createOnboardingDocumentFiles**](OnboardingApi.md#createonboardingdocumentfilesoperation) | **POST** /v2/persons/onboarding/{id}/files | POST Onboarding Document Files |
| [**createOnboardingDocuments**](OnboardingApi.md#createonboardingdocuments) | **POST** /v2/persons/onboarding | POST Onboarding Documents |
| [**getEditOnboardingDocumentsStatus**](OnboardingApi.md#geteditonboardingdocumentsstatus) | **GET** /v2/persons/onboarding/jobs/{jobId} | GET Onboarding Document Jobs |
| [**getOnboardingDocument**](OnboardingApi.md#getonboardingdocument) | **GET** /v2/persons/onboarding/{id} | GET Single Onboarding Document |
| [**getOnboardingDocuments**](OnboardingApi.md#getonboardingdocuments) | **GET** /v2/persons/onboarding | GET Onboarding Documents |



## createOnboardingDocumentFiles

> JobIdObject createOnboardingDocumentFiles(contentType, fileName, id, url, body)

POST Onboarding Document Files

Create a new file for an onboarding document in HR WORKS by sending the binary data in body or an URL to download the file from.

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '@hrworks/auto-client';
import type { CreateOnboardingDocumentFilesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnboardingApi(config);

  const body = {
    // string | The Mime-type of the file.
    contentType: application/pdf,
    // string | The name of the file to display in HR WORKS.
    fileName: testFile.pdf,
    // string | The id of the onboarding document that the uploaded file belongs to.
    id: id_example,
    // string | The url of the document (required if the file is not sent via the request body). (optional)
    url: url_example,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies CreateOnboardingDocumentFilesOperationRequest;

  try {
    const data = await api.createOnboardingDocumentFiles(body);
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
| **contentType** | `string` | The Mime-type of the file. | [Defaults to `undefined`] |
| **fileName** | `string` | The name of the file to display in HR WORKS. | [Defaults to `undefined`] |
| **id** | `string` | The id of the onboarding document that the uploaded file belongs to. | [Defaults to `undefined`] |
| **url** | `string` | The url of the document (required if the file is not sent via the request body). | [Optional] [Defaults to `undefined`] |
| **body** | `Blob` |  | [Optional] |

### Return type

[**JobIdObject**](JobIdObject.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: `application/octet-stream`, `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. The jobId returned with this call can be used to query the persons/onboarding/jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createOnboardingDocuments

> JobIdObject createOnboardingDocuments(editOnboardingDocumentsRequest)

POST Onboarding Documents

Create new onboarding documents in HR WORKS. Refer to the schema OnboardingDocumentData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '@hrworks/auto-client';
import type { CreateOnboardingDocumentsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnboardingApi(config);

  const body = {
    // EditOnboardingDocumentsRequest (optional)
    editOnboardingDocumentsRequest: ...,
  } satisfies CreateOnboardingDocumentsRequest;

  try {
    const data = await api.createOnboardingDocuments(body);
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
| **editOnboardingDocumentsRequest** | [EditOnboardingDocumentsRequest](EditOnboardingDocumentsRequest.md) |  | [Optional] |

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


## getEditOnboardingDocumentsStatus

> GetEditPersonsStatus200Response getEditOnboardingDocumentsStatus(jobId)

GET Onboarding Document Jobs

After a POST request to the /persons/onboarding endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '@hrworks/auto-client';
import type { GetEditOnboardingDocumentsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnboardingApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditOnboardingDocumentsStatusRequest;

  try {
    const data = await api.getEditOnboardingDocumentsStatus(body);
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

[**GetEditPersonsStatus200Response**](GetEditPersonsStatus200Response.md)

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


## getOnboardingDocument

> OnboardingDocument getOnboardingDocument(id)

GET Single Onboarding Document

Returns the data of a single onboarding document with the given id.

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '@hrworks/auto-client';
import type { GetOnboardingDocumentRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnboardingApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies GetOnboardingDocumentRequest;

  try {
    const data = await api.getOnboardingDocument(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**OnboardingDocument**](OnboardingDocument.md)

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


## getOnboardingDocuments

> ListOnboardingDocumentsResponse getOnboardingDocuments(statusFilter, organizationUnits)

GET Onboarding Documents

Lists all onboarding documents of the company. The request may be specified by statusFilter or organization units.

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '@hrworks/auto-client';
import type { GetOnboardingDocumentsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OnboardingApi(config);

  const body = {
    // Array<OnboardingStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // Array<string> | A collection of organization unit identifiers. If this parameter is set, only onboarding documents by persons that are assigned to one of the specified organization units will be included in the response. (optional)
    organizationUnits: ...,
  } satisfies GetOnboardingDocumentsRequest;

  try {
    const data = await api.getOnboardingDocuments(body);
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
| **statusFilter** | `Array<OnboardingStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |
| **organizationUnits** | `Array<string>` | A collection of organization unit identifiers. If this parameter is set, only onboarding documents by persons that are assigned to one of the specified organization units will be included in the response. | [Optional] |

### Return type

[**ListOnboardingDocumentsResponse**](ListOnboardingDocumentsResponse.md)

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

