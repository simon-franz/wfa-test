# AbsencesApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAbsenceTypes**](AbsencesApi.md#createabsencetypes) | **POST** /v2/absences/absence-types | POST Absence Types |
| [**createAbsences**](AbsencesApi.md#createabsencesoperation) | **POST** /v2/absences | POST Absences |
| [**deleteAbsence**](AbsencesApi.md#deleteabsence) | **DELETE** /v2/absences/{number} | DELETE Single Absence |
| [**deleteAbsences**](AbsencesApi.md#deleteabsences) | **DELETE** /v2/absences | DELETE Absences |
| [**editAbsences**](AbsencesApi.md#editabsencesoperation) | **PUT** /v2/absences | PUT Absences |
| [**editSingleAbsence**](AbsencesApi.md#editsingleabsence) | **PUT** /v2/absences/{number} | PUT Single Absence |
| [**getAbsences**](AbsencesApi.md#getabsences) | **GET** /v2/absences/{number} | GET Single Absence |
| [**getEditAbsenceTypesStatus**](AbsencesApi.md#geteditabsencetypesstatus) | **GET** /v2/absences/absence-types/jobs/{jobId} | GET Absence Types Jobs |
| [**getEditAbsencesStatus**](AbsencesApi.md#geteditabsencesstatus) | **GET** /v2/absences/jobs/{jobId} | GET Absences Jobs |
| [**getLeaveAccountData**](AbsencesApi.md#getleaveaccountdata) | **GET** /v2/absences/leave-accounts | GET Leave Account Data |
| [**listAbsenceTypes**](AbsencesApi.md#listabsencetypes) | **GET** /v2/absences/absence-types | GET Absence Types |
| [**listAbsences**](AbsencesApi.md#listabsences) | **GET** /v2/absences | GET Absences |
| [**listAbsencesAccumulated**](AbsencesApi.md#listabsencesaccumulated) | **GET** /v2/absences/accumulated-values | GET Accumulated Absences |
| [**listAbsencesVacationTypes**](AbsencesApi.md#listabsencesvacationtypes) | **GET** /v2/absences/vacation-types | GET Vacation Types |



## createAbsenceTypes

> JobIdObject createAbsenceTypes(editAbsenceTypesRequest)

POST Absence Types

Create new absences type in HR WORKS. Refer to the data type AbsenceType for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { CreateAbsenceTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // EditAbsenceTypesRequest (optional)
    editAbsenceTypesRequest: ...,
  } satisfies CreateAbsenceTypesRequest;

  try {
    const data = await api.createAbsenceTypes(body);
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
| **editAbsenceTypesRequest** | [EditAbsenceTypesRequest](EditAbsenceTypesRequest.md) |  | [Optional] |

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


## createAbsences

> JobIdObject createAbsences(createAbsencesRequest)

POST Absences

Create new absences in HR WORKS. Refer to the data type AbsenceData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { CreateAbsencesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // CreateAbsencesRequest (optional)
    createAbsencesRequest: ...,
  } satisfies CreateAbsencesOperationRequest;

  try {
    const data = await api.createAbsences(body);
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
| **createAbsencesRequest** | [CreateAbsencesRequest](CreateAbsencesRequest.md) |  | [Optional] |

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


## deleteAbsence

> JobIdObject deleteAbsence(number)

DELETE Single Absence

Delete a single absence in HR WORKS.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { DeleteAbsenceRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The absence number of the absence. Consists of the person\'s license number before the underscore and the running absence number for the respective person after the underscore.
    number: number_example,
  } satisfies DeleteAbsenceRequest;

  try {
    const data = await api.deleteAbsence(body);
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
| **number** | `string` | The absence number of the absence. Consists of the person\&#39;s license number before the underscore and the running absence number for the respective person after the underscore. | [Defaults to `undefined`] |

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


## deleteAbsences

> JobIdObject deleteAbsences(numbers)

DELETE Absences

Delete multiple absences for HR WORKS.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { DeleteAbsencesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // Array<string> | List of absence numbers.
    numbers: ...,
  } satisfies DeleteAbsencesRequest;

  try {
    const data = await api.deleteAbsences(body);
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
| **numbers** | `Array<string>` | List of absence numbers. | |

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


## editAbsences

> JobIdObject editAbsences(editAbsencesRequest)

PUT Absences

Edit absences in HR WORKS. Refer to the data type AbsenceData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { EditAbsencesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // EditAbsencesRequest (optional)
    editAbsencesRequest: ...,
  } satisfies EditAbsencesOperationRequest;

  try {
    const data = await api.editAbsences(body);
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
| **editAbsencesRequest** | [EditAbsencesRequest](EditAbsencesRequest.md) |  | [Optional] |

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


## editSingleAbsence

> JobIdObject editSingleAbsence(number, absenceData)

PUT Single Absence

Edit an absence in HR WORKS. Refer to the data type EditAbsenceData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { EditSingleAbsenceRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The unique identifier of the absence. Consists of the person\'s license number before the underscore and the running absence number for the respective person after the underscore.
    number: 55_1,
    // AbsenceData (optional)
    absenceData: ...,
  } satisfies EditSingleAbsenceRequest;

  try {
    const data = await api.editSingleAbsence(body);
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
| **number** | `string` | The unique identifier of the absence. Consists of the person\&#39;s license number before the underscore and the running absence number for the respective person after the underscore. | [Defaults to `undefined`] |
| **absenceData** | [AbsenceData](AbsenceData.md) |  | [Optional] |

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


## getAbsences

> Absence getAbsences(number)

GET Single Absence

Return the data of a specific absence using the given ID.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { GetAbsencesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The absence number of the absence. Consists of the person\'s license number before the underscore and the running absence number for the respective person after the underscore.
    number: number_example,
  } satisfies GetAbsencesRequest;

  try {
    const data = await api.getAbsences(body);
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
| **number** | `string` | The absence number of the absence. Consists of the person\&#39;s license number before the underscore and the running absence number for the respective person after the underscore. | [Defaults to `undefined`] |

### Return type

[**Absence**](Absence.md)

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


## getEditAbsenceTypesStatus

> MultiWriteRequestResponse getEditAbsenceTypesStatus(jobId)

GET Absence Types Jobs

After a POST or PUT request to the /absences/absence-types endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { GetEditAbsenceTypesStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditAbsenceTypesStatusRequest;

  try {
    const data = await api.getEditAbsenceTypesStatus(body);
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


## getEditAbsencesStatus

> GetEditAbsencesStatus200Response getEditAbsencesStatus(jobId)

GET Absences Jobs

After a POST or PUT request to the /absences endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { GetEditAbsencesStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditAbsencesStatusRequest;

  try {
    const data = await api.getEditAbsencesStatus(body);
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

[**GetEditAbsencesStatus200Response**](GetEditAbsencesStatus200Response.md)

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


## getLeaveAccountData

> { [key: string]: LeaveAccount; } getLeaveAccountData(persons, referenceDate, usePersonnelNumbers, onlyActive, page)

GET Leave Account Data

Returns the relevant leave account data for the specified persons.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { GetLeaveAccountDataRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // string | The reference date for which the leave account data will be generated. The date interval over which the data will be generated always starts from January 1st of the year specified in this parameter and ends at the reference date. (optional)
    referenceDate: referenceDate_example,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies GetLeaveAccountDataRequest;

  try {
    const data = await api.getLeaveAccountData(body);
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
| **persons** | `Array<string>` | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. | [Optional] |
| **referenceDate** | `string` | The reference date for which the leave account data will be generated. The date interval over which the data will be generated always starts from January 1st of the year specified in this parameter and ends at the reference date. | [Optional] [Defaults to `undefined`] |
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `undefined`] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `undefined`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

[**{ [key: string]: LeaveAccount; }**](LeaveAccount.md)

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


## listAbsenceTypes

> ListAbsenceTypesResponse listAbsenceTypes(onlyActive)

GET Absence Types

Lists all absence types defined for the caller\&#39;s customer account in HR WORKS. The keys returned by this action can be used as filter values for other absence actions.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { ListAbsenceTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // boolean | If set to true, only the currently active absence types will be returned. (optional)
    onlyActive: true,
  } satisfies ListAbsenceTypesRequest;

  try {
    const data = await api.listAbsenceTypes(body);
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
| **onlyActive** | `boolean` | If set to true, only the currently active absence types will be returned. | [Optional] [Defaults to `undefined`] |

### Return type

[**ListAbsenceTypesResponse**](ListAbsenceTypesResponse.md)

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


## listAbsences

> { [key: string]: Array&lt;AbsencesDateIntervalData&gt;; } listAbsences(beginDate, endDate, persons, types, count, usePersonnelNumbers, interval, onlyActive, statusFilter, page)

GET Absences

Returns a list of absences for the specified persons in the specified date interval.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { ListAbsencesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // Array<string> | This parameter can be used to apply a filter to the result by specifying a list of absence type identifiers/keys. If set, only absences matching one of those keys will be returned. Note: The absence type keys can be retrieved via the /absences/absence-types endpoint. (optional)
    types: ...,
    // boolean | If set to \"true\", this action will return the cumulated working days count for each absence type instead of the absence details. This impacts the structure of the API response. Refer to the examples below. (optional)
    count: true,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // Array<AbsenceStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies ListAbsencesRequest;

  try {
    const data = await api.listAbsences(body);
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
| **persons** | `Array<string>` | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. | [Optional] |
| **types** | `Array<string>` | This parameter can be used to apply a filter to the result by specifying a list of absence type identifiers/keys. If set, only absences matching one of those keys will be returned. Note: The absence type keys can be retrieved via the /absences/absence-types endpoint. | [Optional] |
| **count** | `boolean` | If set to \&quot;true\&quot;, this action will return the cumulated working days count for each absence type instead of the absence details. This impacts the structure of the API response. Refer to the examples below. | [Optional] [Defaults to `undefined`] |
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `undefined`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `undefined`] |
| **statusFilter** | `Array<AbsenceStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

**{ [key: string]: Array<AbsencesDateIntervalData>; }**

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


## listAbsencesAccumulated

> { [key: string]: Array&lt;AccumulatedAbsencesDateIntervalData&gt;; } listAbsencesAccumulated(beginDate, endDate, persons, types, usePersonnelNumbers, interval, statusFilter, page)

GET Accumulated Absences

Returns the cumulated working days count of each absence type for the specified persons in the specified date interval.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { ListAbsencesAccumulatedRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // Array<string> | This parameter can be used to apply a filter to the result by specifying a list of absence type identifiers/keys. If set, only absences matching one of those keys will be returned. Note: The absence type keys can be retrieved via the /absences/absence-types endpoint. (optional)
    types: ...,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // Array<AbsenceStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies ListAbsencesAccumulatedRequest;

  try {
    const data = await api.listAbsencesAccumulated(body);
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
| **persons** | `Array<string>` | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. | [Optional] |
| **types** | `Array<string>` | This parameter can be used to apply a filter to the result by specifying a list of absence type identifiers/keys. If set, only absences matching one of those keys will be returned. Note: The absence type keys can be retrieved via the /absences/absence-types endpoint. | [Optional] |
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `undefined`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **statusFilter** | `Array<AbsenceStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

**{ [key: string]: Array<AccumulatedAbsencesDateIntervalData>; }**

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


## listAbsencesVacationTypes

> ListVacationTypesResponse listAbsencesVacationTypes(onlyAssigned, onlyActive, countryCodes)

GET Vacation Types

Returns the vacation types of the company.

### Example

```ts
import {
  Configuration,
  AbsencesApi,
} from '@hrworks/auto-client';
import type { ListAbsencesVacationTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AbsencesApi(config);

  const body = {
    // boolean | Set this parameter to false to also return vacation types that are not assigned to any person. (optional)
    onlyAssigned: true,
    // boolean | Set this parameter to false to also return vacation types that are not active. (optional)
    onlyActive: true,
    // Array<string> | A collection of ISO 3166-1 alpha-3 country codes (e.g. DEU, IRL, USA) for which to return data. If not specified, data for all countries of the company will be returned. Country codes without a corresponding country will be omitted. (optional)
    countryCodes: ...,
  } satisfies ListAbsencesVacationTypesRequest;

  try {
    const data = await api.listAbsencesVacationTypes(body);
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
| **onlyAssigned** | `boolean` | Set this parameter to false to also return vacation types that are not assigned to any person. | [Optional] [Defaults to `true`] |
| **onlyActive** | `boolean` | Set this parameter to false to also return vacation types that are not active. | [Optional] [Defaults to `true`] |
| **countryCodes** | `Array<string>` | A collection of ISO 3166-1 alpha-3 country codes (e.g. DEU, IRL, USA) for which to return data. If not specified, data for all countries of the company will be returned. Country codes without a corresponding country will be omitted. | [Optional] |

### Return type

[**ListVacationTypesResponse**](ListVacationTypesResponse.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | successful operation |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

