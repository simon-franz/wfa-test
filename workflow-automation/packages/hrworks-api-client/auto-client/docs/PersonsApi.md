# PersonsApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPersonDocuments**](PersonsApi.md#createpersondocuments) | **POST** /v2/persons/files | POST Person Documents |
| [**createPersonWorkingTime**](PersonsApi.md#createpersonworkingtime) | **POST** /v2/persons/{personIdentifier}/working-times | POST Start/Stop Working Time |
| [**createPersonnelFileEntries**](PersonsApi.md#createpersonnelfileentriesoperation) | **POST** /v2/persons/personnel-file | POST Personnel File Entries |
| [**createPersonnelFileEntryFile**](PersonsApi.md#createpersonnelfileentryfile) | **POST** /v2/persons/{personIdentifier}/personnel-file/{personnelFileEntryId}/files | POST Personnel File Entry File |
| [**createPersonnelFileEntryStatus**](PersonsApi.md#createpersonnelfileentrystatus) | **GET** /v2/persons/personnel-file/jobs/{jobId} | GET Personnel File Jobs |
| [**createPersons**](PersonsApi.md#createpersons) | **POST** /v2/persons | POST Persons |
| [**createSinglePersonDocuments**](PersonsApi.md#createsinglepersondocuments) | **POST** /v2/persons/{personIdentifier}/files | POST Single Person Documents |
| [**editPersons**](PersonsApi.md#editpersonsoperation) | **PUT** /v2/persons | PUT Persons |
| [**getAvailableWorkingHours**](PersonsApi.md#getavailableworkinghours) | **GET** /v2/persons/available-working-hours | GET Available Working Hours |
| [**getEditPersonsStatus**](PersonsApi.md#geteditpersonsstatus) | **GET** /v2/persons/jobs/{jobId} | GET Persons Jobs |
| [**getPerson**](PersonsApi.md#getperson) | **GET** /v2/persons/{personIdentifier} | GET Single Person |
| [**getPersonLeaveAccountData**](PersonsApi.md#getpersonleaveaccountdata) | **GET** /v2/persons/{personnelNumber}/leave-account | GET Person Leave Account Data |
| [**getPersonMasterData**](PersonsApi.md#getpersonmasterdata) | **GET** /v2/persons/master-data | GET Persons Master Data |
| [**getPersonPersonnelFileCategories**](PersonsApi.md#getpersonpersonnelfilecategories) | **GET** /v2/persons/personnel-file/categories | GET Personnel File Categories |
| [**getPersonPersonnelFileEntries**](PersonsApi.md#getpersonpersonnelfileentries) | **GET** /v2/persons/{personIdentifier}/personnel-file | GET Personnel File Entries |
| [**getPersonPersonnelFileEntry**](PersonsApi.md#getpersonpersonnelfileentry) | **GET** /v2/persons/{personIdentifier}/personnel-file/{personnelFileEntryId} | GET Single Personnel File Entry |
| [**getPersonsDay**](PersonsApi.md#getpersonsday) | **GET** /v2/persons/today | GET Persons Today |
| [**getSinglePersonMasterData**](PersonsApi.md#getsinglepersonmasterdata) | **GET** /v2/persons/{personIdentifier}/master-data | GET Single Person Master Data |
| [**getSinglePersonWorkingTimeStatus**](PersonsApi.md#getsinglepersonworkingtimestatus) | **GET** /v2/persons/{personIdentifier}/working-times/status | GET Working Time Status |
| [**listPersons**](PersonsApi.md#listpersons) | **GET** /v2/persons | GET Persons |



## createPersonDocuments

> JobIdObject createPersonDocuments(fileName, url, body)

POST Person Documents

Create a new file in the HR WORKS document pool by sending the binary data in body or an URL to download the file from.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreatePersonDocumentsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The name of the file to display in HR WORKS.
    fileName: testFile.pdf,
    // string | The url of the document (required if the file is not sent via the request body). (optional)
    url: url_example,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies CreatePersonDocumentsRequest;

  try {
    const data = await api.createPersonDocuments(body);
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
| **fileName** | `string` | The name of the file to display in HR WORKS. | [Defaults to `undefined`] |
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
| **200** | Success response. The jobId returned with this call can be used to query the persons/jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createPersonWorkingTime

> CreatePersonWorkingTimeResponse createPersonWorkingTime(personIdentifier, action, type, project, kioskId, comment)

POST Start/Stop Working Time

Creates and returns a persons current working time.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreatePersonWorkingTimeRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The personnel number, or personIdentifier of the person. Default value is personnel number, can be changed in the settings
    personIdentifier: personIdentifier_example,
    // string | The action which should be made, can be either \'clockIn\' or \'clockOut. (The Actions have different required parameters).
    action: action_example,
    // string | If action is \'clockIn\' this parameter required and sets the working time type. (optional)
    type: type_example,
    // string | The project number. (optional)
    project: project_example,
    // number | The kiosk id. (optional)
    kioskId: 8.14,
    // string | Comment on the working time. (optional)
    comment: comment_example,
  } satisfies CreatePersonWorkingTimeRequest;

  try {
    const data = await api.createPersonWorkingTime(body);
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
| **personIdentifier** | `string` | The personnel number, or personIdentifier of the person. Default value is personnel number, can be changed in the settings | [Defaults to `undefined`] |
| **action** | `string` | The action which should be made, can be either \&#39;clockIn\&#39; or \&#39;clockOut. (The Actions have different required parameters). | [Defaults to `undefined`] |
| **type** | `string` | If action is \&#39;clockIn\&#39; this parameter required and sets the working time type. | [Optional] [Defaults to `undefined`] |
| **project** | `string` | The project number. | [Optional] [Defaults to `undefined`] |
| **kioskId** | `number` | The kiosk id. | [Optional] [Defaults to `undefined`] |
| **comment** | `string` | Comment on the working time. | [Optional] [Defaults to `undefined`] |

### Return type

[**CreatePersonWorkingTimeResponse**](CreatePersonWorkingTimeResponse.md)

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


## createPersonnelFileEntries

> JobIdObject createPersonnelFileEntries(createPersonnelFileEntriesRequest, personIdentifierType)

POST Personnel File Entries

Create multiple personnel file entries for the specified persons.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreatePersonnelFileEntriesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // CreatePersonnelFileEntriesRequest | Collection of personnel file entry data.
    createPersonnelFileEntriesRequest: ...,
    // PersonIdentifierType | Specifies the type of personIdentifiers in the request (optional)
    personIdentifierType: ...,
  } satisfies CreatePersonnelFileEntriesOperationRequest;

  try {
    const data = await api.createPersonnelFileEntries(body);
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
| **createPersonnelFileEntriesRequest** | [CreatePersonnelFileEntriesRequest](CreatePersonnelFileEntriesRequest.md) | Collection of personnel file entry data. | |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of personIdentifiers in the request | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |

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


## createPersonnelFileEntryFile

> JobIdObject createPersonnelFileEntryFile(fileName, personIdentifier, personnelFileEntryId, contentType, personIdentifierType, url, body)

POST Personnel File Entry File

Attach a new file to a personnel file entry in HR WORKS by sending the binary data in body or an URL to download the file from.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreatePersonnelFileEntryFileRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The name of the file to display in HR WORKS.
    fileName: testFile.pdf,
    // string | The identifier of the person. Use personIdentifierType to specify what type the value is.
    personIdentifier: personIdentifier_example,
    // string | The id of the personnel file entry that the uploaded file belongs to.
    personnelFileEntryId: personnelFileEntryId_example,
    // string | The Mime-type of the file, only required if a file is included in the request body (optional)
    contentType: application/pdf,
    // PersonIdentifierType | Specifies the type of the personIdentifier. Default is personnelNumber. (optional)
    personIdentifierType: ...,
    // string | The url of the document (required if the file is not sent via the request body). (optional)
    url: url_example,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies CreatePersonnelFileEntryFileRequest;

  try {
    const data = await api.createPersonnelFileEntryFile(body);
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
| **fileName** | `string` | The name of the file to display in HR WORKS. | [Defaults to `undefined`] |
| **personIdentifier** | `string` | The identifier of the person. Use personIdentifierType to specify what type the value is. | [Defaults to `undefined`] |
| **personnelFileEntryId** | `string` | The id of the personnel file entry that the uploaded file belongs to. | [Defaults to `undefined`] |
| **contentType** | `string` | The Mime-type of the file, only required if a file is included in the request body | [Optional] [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of the personIdentifier. Default is personnelNumber. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
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
| **200** | Success response. The jobId returned with this call can be used to query the personnel-file/jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createPersonnelFileEntryStatus

> CreatePersonnelFileEntryStatus200Response createPersonnelFileEntryStatus(jobId)

GET Personnel File Jobs

After a POST or PUT or DELETE request to the /personnel-file endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreatePersonnelFileEntryStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies CreatePersonnelFileEntryStatusRequest;

  try {
    const data = await api.createPersonnelFileEntryStatus(body);
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

[**CreatePersonnelFileEntryStatus200Response**](CreatePersonnelFileEntryStatus200Response.md)

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


## createPersons

> JobIdObject createPersons(editPersonsRequest)

POST Persons

Create new employees in HR WORKS. Refer to the data type Person for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes). Note: Creating employees causes license costs.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreatePersonsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // EditPersonsRequest (optional)
    editPersonsRequest: ...,
  } satisfies CreatePersonsRequest;

  try {
    const data = await api.createPersons(body);
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
| **editPersonsRequest** | [EditPersonsRequest](EditPersonsRequest.md) |  | [Optional] |

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


## createSinglePersonDocuments

> JobIdObject createSinglePersonDocuments(fileName, personIdentifier, url, personIdentifierType, body)

POST Single Person Documents

Create a new file in the HR WORKS Person document pool by sending the binary data in body or an URL to download the file from.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { CreateSinglePersonDocumentsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The name of the file to display in HR WORKS.
    fileName: testFile.pdf,
    // string | The identifier of a person in the HR WORKS API. Use personIdentifierType to specify what type the value is.
    personIdentifier: personIdentifier_example,
    // string | The url of the document (required if the file is not sent via the request body). (optional)
    url: url_example,
    // PersonIdentifierType | Specifies the type of the personIdentifier. Default is personId. (optional)
    personIdentifierType: ...,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies CreateSinglePersonDocumentsRequest;

  try {
    const data = await api.createSinglePersonDocuments(body);
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
| **fileName** | `string` | The name of the file to display in HR WORKS. | [Defaults to `undefined`] |
| **personIdentifier** | `string` | The identifier of a person in the HR WORKS API. Use personIdentifierType to specify what type the value is. | [Defaults to `undefined`] |
| **url** | `string` | The url of the document (required if the file is not sent via the request body). | [Optional] [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of the personIdentifier. Default is personId. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
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
| **200** | Success response. The jobId returned with this call can be used to query the persons/jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editPersons

> JobIdObject editPersons(editPersonsRequest)

PUT Persons

Edit existing emyployees in HR WORKS. Refer to the data type Person for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { EditPersonsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // EditPersonsRequest (optional)
    editPersonsRequest: ...,
  } satisfies EditPersonsOperationRequest;

  try {
    const data = await api.editPersons(body);
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
| **editPersonsRequest** | [EditPersonsRequest](EditPersonsRequest.md) |  | [Optional] |

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


## getAvailableWorkingHours

> { [key: string]: Array&lt;AvailableWorkingHoursDateIntervalData&gt;; } getAvailableWorkingHours(beginDate, endDate, personIdentifierType, persons, usePersonnelNumbers, interval, onlyActive, page)

GET Available Working Hours

Returns the cumulated available working hours of the specified persons in the date interval specified by the beginDate and endDate parameters. The selected date interval can be further divided into days, weeks or months..

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetAvailableWorkingHoursRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // PersonIdentifierType | Specifies the type of identifiers in the persons parameter. Default is personId. (optional)
    personIdentifierType: ...,
    // Array<string> | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. (optional)
    persons: ...,
    // boolean | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \'days\' will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if weeks was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 150. (optional)
    page: 8.14,
  } satisfies GetAvailableWorkingHoursRequest;

  try {
    const data = await api.getAvailableWorkingHours(body);
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
| **beginDate** | `string` | The starting date of the date interval. Note: The maximum date interval is one year. | [Defaults to `undefined`] |
| **endDate** | `string` | The end date of the date interval. Note: The maximum date interval is one year. | [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of identifiers in the persons parameter. Default is personId. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
| **persons** | `Array<string>` | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. | [Optional] |
| **usePersonnelNumbers** | `boolean` | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&#39;days\&#39; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if weeks was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 150. | [Optional] [Defaults to `1`] |

### Return type

**{ [key: string]: Array<AvailableWorkingHoursDateIntervalData>; }**

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


## getEditPersonsStatus

> GetEditPersonsStatus200Response getEditPersonsStatus(jobId)

GET Persons Jobs

After a POST or PUT request to the /persons or the /persons/files endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetEditPersonsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditPersonsStatusRequest;

  try {
    const data = await api.getEditPersonsStatus(body);
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


## getPerson

> PersonBaseData getPerson(personIdentifier, personIdentifierType)

GET Single Person

Return the base data of a specific person.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The identifier of the person. Use personIdentifierType to specify what type the value is.
    personIdentifier: personIdentifier_example,
    // PersonIdentifierType | Specifies the type of the personIdentifier. Default is personnelNumber. (optional)
    personIdentifierType: ...,
  } satisfies GetPersonRequest;

  try {
    const data = await api.getPerson(body);
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
| **personIdentifier** | `string` | The identifier of the person. Use personIdentifierType to specify what type the value is. | [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of the personIdentifier. Default is personnelNumber. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |

### Return type

[**PersonBaseData**](PersonBaseData.md)

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


## getPersonLeaveAccountData

> LeaveAccount getPersonLeaveAccountData(personnelNumber, referenceDate)

GET Person Leave Account Data

Returns the leave account data of the specified person.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonLeaveAccountDataRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The HR WORKS personnel number of the person to display data for.
    personnelNumber: personnelNumber_example,
    // Date | The reference date for which the leave account data will be generated. The date interval over which the data will be generated always starts from January 1st of the year specified in this parameter and ends at the reference date. (optional)
    referenceDate: 2013-10-20,
  } satisfies GetPersonLeaveAccountDataRequest;

  try {
    const data = await api.getPersonLeaveAccountData(body);
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
| **personnelNumber** | `string` | The HR WORKS personnel number of the person to display data for. | [Defaults to `undefined`] |
| **referenceDate** | `Date` | The reference date for which the leave account data will be generated. The date interval over which the data will be generated always starts from January 1st of the year specified in this parameter and ends at the reference date. | [Optional] [Defaults to `undefined`] |

### Return type

[**LeaveAccount**](LeaveAccount.md)

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


## getPersonMasterData

> GetPersonMasterDataResponse getPersonMasterData(personIdentifierType, persons, usePersonnelNumbers, onlyActive, page)

GET Persons Master Data

Returns the current master data of the specified persons.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonMasterDataRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // PersonIdentifierType | Specifies the type of identifiers in the persons parameter. Default is personId. (optional)
    personIdentifierType: ...,
    // Array<string> | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. (optional)
    persons: ...,
    // boolean | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies GetPersonMasterDataRequest;

  try {
    const data = await api.getPersonMasterData(body);
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
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of identifiers in the persons parameter. Default is personId. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
| **persons** | `Array<string>` | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. | [Optional] |
| **usePersonnelNumbers** | `boolean` | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

[**GetPersonMasterDataResponse**](GetPersonMasterDataResponse.md)

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


## getPersonPersonnelFileCategories

> ListPersonnelFileCategoriesResponse getPersonPersonnelFileCategories()

GET Personnel File Categories

Lists all personnel file categories of the company.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonPersonnelFileCategoriesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  try {
    const data = await api.getPersonPersonnelFileCategories();
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

[**ListPersonnelFileCategoriesResponse**](ListPersonnelFileCategoriesResponse.md)

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


## getPersonPersonnelFileEntries

> ListPersonPersonnelFileEntriesResponse getPersonPersonnelFileEntries(personIdentifier, personIdentifierType, category, hasDocuments, isWageRelevant, createdAfter, createdBefore)

GET Personnel File Entries

Returns the personnel file entries of the specified person.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonPersonnelFileEntriesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The identifier of the person to display data for. Use personIdentifierType to specify what type the value is.
    personIdentifier: personIdentifier_example,
    // PersonIdentifierType | Specifies the type of the personIdentifier. Default is personnelNumber. (optional)
    personIdentifierType: ...,
    // string | The key of the personnel file entry category to filter the result by. (optional)
    category: category_example,
    // boolean | Allows filtering for personnel file entries with/without attached PDF documents. (optional)
    hasDocuments: true,
    // boolean | Allows filtering for personnel file entries being (not) wage relevant. (optional)
    isWageRelevant: true,
    // Date | Allows filtering for personnel file entries that were created on or after the specified date. Date in YYYY-MM-DD format. (optional)
    createdAfter: 2013-10-20,
    // Date | Allows filtering for personnel file entries that were created on or before the specified date. Date in YYYY-MM-DD format. (optional)
    createdBefore: 2013-10-20,
  } satisfies GetPersonPersonnelFileEntriesRequest;

  try {
    const data = await api.getPersonPersonnelFileEntries(body);
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
| **personIdentifier** | `string` | The identifier of the person to display data for. Use personIdentifierType to specify what type the value is. | [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of the personIdentifier. Default is personnelNumber. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
| **category** | `string` | The key of the personnel file entry category to filter the result by. | [Optional] [Defaults to `undefined`] |
| **hasDocuments** | `boolean` | Allows filtering for personnel file entries with/without attached PDF documents. | [Optional] [Defaults to `undefined`] |
| **isWageRelevant** | `boolean` | Allows filtering for personnel file entries being (not) wage relevant. | [Optional] [Defaults to `undefined`] |
| **createdAfter** | `Date` | Allows filtering for personnel file entries that were created on or after the specified date. Date in YYYY-MM-DD format. | [Optional] [Defaults to `undefined`] |
| **createdBefore** | `Date` | Allows filtering for personnel file entries that were created on or before the specified date. Date in YYYY-MM-DD format. | [Optional] [Defaults to `undefined`] |

### Return type

[**ListPersonPersonnelFileEntriesResponse**](ListPersonPersonnelFileEntriesResponse.md)

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


## getPersonPersonnelFileEntry

> PersonnelFileEntry getPersonPersonnelFileEntry(personIdentifier, personnelFileEntryId, personIdentifierType)

GET Single Personnel File Entry

Returns a specific personnel file entry for the specified person.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonPersonnelFileEntryRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The identifier of the person to display data for. Use personIdentifierType to specify what type the value is.
    personIdentifier: personIdentifier_example,
    // string | The id of the personnel file entry that should be returned.
    personnelFileEntryId: personnelFileEntryId_example,
    // PersonIdentifierType | Specifies the type of the personIdentifier. Default is personnelNumber. (optional)
    personIdentifierType: ...,
  } satisfies GetPersonPersonnelFileEntryRequest;

  try {
    const data = await api.getPersonPersonnelFileEntry(body);
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
| **personIdentifier** | `string` | The identifier of the person to display data for. Use personIdentifierType to specify what type the value is. | [Defaults to `undefined`] |
| **personnelFileEntryId** | `string` | The id of the personnel file entry that should be returned. | [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of the personIdentifier. Default is personnelNumber. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |

### Return type

[**PersonnelFileEntry**](PersonnelFileEntry.md)

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


## getPersonsDay

> { [key: string]: PersonDay; } getPersonsDay(personIdentifierType, persons, usePersonnelNumbers, onlyActive, includeData, page)

GET Persons Today

Return day related objects for multiple employees of the current day.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetPersonsDayRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // PersonIdentifierType | Specifies the type of identifiers in the persons parameter. Default is personId. (optional)
    personIdentifierType: ...,
    // Array<string> | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. (optional)
    persons: ...,
    // boolean | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // Array<IncludeDataForPersonsDayRequest> | Select all data sources to include. Target working hours and holidays are always included. (optional)
    includeData: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies GetPersonsDayRequest;

  try {
    const data = await api.getPersonsDay(body);
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
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of identifiers in the persons parameter. Default is personId. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
| **persons** | `Array<string>` | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. | [Optional] |
| **usePersonnelNumbers** | `boolean` | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **includeData** | `Array<IncludeDataForPersonsDayRequest>` | Select all data sources to include. Target working hours and holidays are always included. | [Optional] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

[**{ [key: string]: PersonDay; }**](PersonDay.md)

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


## getSinglePersonMasterData

> Person getSinglePersonMasterData(personIdentifier, personIdentifierType)

GET Single Person Master Data

Returns the current master data of the specified person.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetSinglePersonMasterDataRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The identifier of the person to display data for.
    personIdentifier: personIdentifier_example,
    // PersonIdentifierType | Specifies the type of the personIdentifier. Default is personnelNumber. (optional)
    personIdentifierType: ...,
  } satisfies GetSinglePersonMasterDataRequest;

  try {
    const data = await api.getSinglePersonMasterData(body);
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
| **personIdentifier** | `string` | The identifier of the person to display data for. | [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | Specifies the type of the personIdentifier. Default is personnelNumber. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |

### Return type

[**Person**](Person.md)

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


## getSinglePersonWorkingTimeStatus

> WorkingTimeStatus getSinglePersonWorkingTimeStatus(personIdentifier)

GET Working Time Status

Returns the current working time status of a person.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { GetSinglePersonWorkingTimeStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // string | The personnel number, or personIdentifier of the person. Default value is personnel number, can be changed in the settings.
    personIdentifier: personIdentifier_example,
  } satisfies GetSinglePersonWorkingTimeStatusRequest;

  try {
    const data = await api.getSinglePersonWorkingTimeStatus(body);
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
| **personIdentifier** | `string` | The personnel number, or personIdentifier of the person. Default value is personnel number, can be changed in the settings. | [Defaults to `undefined`] |

### Return type

[**WorkingTimeStatus**](WorkingTimeStatus.md)

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


## listPersons

> { [key: string]: Array&lt;PersonBaseData&gt;; } listPersons(organizationUnits, onlyActive, onlyActiveOrganizationUnits, identifierType)

GET Persons

Lists all persons in the company (or in the specified organization units). By default, only active persons are returned. Each person that was neither deleted nor has left the company counts as active.

### Example

```ts
import {
  Configuration,
  PersonsApi,
} from '@hrworks/auto-client';
import type { ListPersonsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PersonsApi(config);

  const body = {
    // Array<string> | A collection of organization unit identifiers. If this parameter is set, only persons that are assigned to one of the specified organization units will be included in the response. (optional)
    organizationUnits: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // boolean | Set this parameter to false to return persons that are either assigned to deactivated organization units or have no organization unit. (optional)
    onlyActiveOrganizationUnits: true,
    // OrganizationUnitIdentifierType | Specifies the type of identifiers in the organizationUnits parameter. Default is number. This also defines whether the persons are grouped by the organization unit number or the organziation unit uuid. (optional)
    identifierType: ...,
  } satisfies ListPersonsRequest;

  try {
    const data = await api.listPersons(body);
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
| **organizationUnits** | `Array<string>` | A collection of organization unit identifiers. If this parameter is set, only persons that are assigned to one of the specified organization units will be included in the response. | [Optional] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **onlyActiveOrganizationUnits** | `boolean` | Set this parameter to false to return persons that are either assigned to deactivated organization units or have no organization unit. | [Optional] [Defaults to `true`] |
| **identifierType** | `OrganizationUnitIdentifierType` | Specifies the type of identifiers in the organizationUnits parameter. Default is number. This also defines whether the persons are grouped by the organization unit number or the organziation unit uuid. | [Optional] [Defaults to `undefined`] [Enum: number, uuid] |

### Return type

**{ [key: string]: Array<PersonBaseData>; }**

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

