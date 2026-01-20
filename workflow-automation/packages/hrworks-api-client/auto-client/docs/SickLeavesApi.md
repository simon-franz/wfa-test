# SickLeavesApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSickLeaveTypes**](SickLeavesApi.md#createsickleavetypes) | **POST** /v2/sick-leaves/sick-leave-types | POST Sick Leave Types |
| [**createSickLeaves**](SickLeavesApi.md#createsickleavesoperation) | **POST** /v2/sick-leaves | POST Sick Leaves |
| [**deleteSickLeave**](SickLeavesApi.md#deletesickleave) | **DELETE** /v2/sick-leaves/{number} | DELETE Single Sick Leave |
| [**deleteSickLeaves**](SickLeavesApi.md#deletesickleaves) | **DELETE** /v2/sick-leaves | DELETE Sick Leaves |
| [**editSickLeaves**](SickLeavesApi.md#editsickleavesoperation) | **PUT** /v2/sick-leaves | PUT Sick Leaves |
| [**getEditSickLeaveTypesStatus**](SickLeavesApi.md#geteditsickleavetypesstatus) | **GET** /v2/sick-leaves/sick-leave-types/jobs/{jobId} | GET Sick Leave Types Jobs |
| [**getEditSickLeavesStatus**](SickLeavesApi.md#geteditsickleavesstatus) | **GET** /v2/sick-leaves/jobs/{jobId} | GET Sick Leaves Jobs |
| [**getSickLeave**](SickLeavesApi.md#getsickleave) | **GET** /v2/sick-leaves/{number} | GET Single Sick Leave |
| [**listSickLeaveTypes**](SickLeavesApi.md#listsickleavetypes) | **GET** /v2/sick-leaves/sick-leave-types | GET Sick Leave Types |
| [**listSickLeaves**](SickLeavesApi.md#listsickleaves) | **GET** /v2/sick-leaves | GET Sick Leaves |
| [**listSickLeavesAccumulated**](SickLeavesApi.md#listsickleavesaccumulated) | **GET** /v2/sick-leaves/accumulated-values | GET Accumulated Sick Leaves |



## createSickLeaveTypes

> JobIdObject createSickLeaveTypes(editSickLeaveTypesRequest)

POST Sick Leave Types

Create new  sick leave type in HR WORKS. Refer to the data type SickLeaveType for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { CreateSickLeaveTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // EditSickLeaveTypesRequest (optional)
    editSickLeaveTypesRequest: ...,
  } satisfies CreateSickLeaveTypesRequest;

  try {
    const data = await api.createSickLeaveTypes(body);
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
| **editSickLeaveTypesRequest** | [EditSickLeaveTypesRequest](EditSickLeaveTypesRequest.md) |  | [Optional] |

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
| **200** | Success response. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createSickLeaves

> JobIdObject createSickLeaves(createSickLeavesRequest)

POST Sick Leaves

Create new sick leaves in HR WORKS. Refer to the data type SickLeaveData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { CreateSickLeavesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // CreateSickLeavesRequest (optional)
    createSickLeavesRequest: ...,
  } satisfies CreateSickLeavesOperationRequest;

  try {
    const data = await api.createSickLeaves(body);
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
| **createSickLeavesRequest** | [CreateSickLeavesRequest](CreateSickLeavesRequest.md) |  | [Optional] |

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


## deleteSickLeave

> JobIdObject deleteSickLeave(number)

DELETE Single Sick Leave

Delete a single sick leave by ID.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { DeleteSickLeaveRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // string | The number of the sick leave. Consists of the person\'s license number before the underscore and the running sick leave number for the respective person after the underscore.
    number: number_example,
  } satisfies DeleteSickLeaveRequest;

  try {
    const data = await api.deleteSickLeave(body);
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
| **number** | `string` | The number of the sick leave. Consists of the person\&#39;s license number before the underscore and the running sick leave number for the respective person after the underscore. | [Defaults to `undefined`] |

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


## deleteSickLeaves

> JobIdObject deleteSickLeaves(numbers)

DELETE Sick Leaves

Delete multiple sick leaves in HR WORKS.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { DeleteSickLeavesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // Array<string> | List of sick leave numbers.
    numbers: ...,
  } satisfies DeleteSickLeavesRequest;

  try {
    const data = await api.deleteSickLeaves(body);
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
| **numbers** | `Array<string>` | List of sick leave numbers. | |

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


## editSickLeaves

> JobIdObject editSickLeaves(editSickLeavesRequest)

PUT Sick Leaves

Edit sick leave objects in HR WORKS. Refer to the data type SickLeaveData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { EditSickLeavesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // EditSickLeavesRequest (optional)
    editSickLeavesRequest: ...,
  } satisfies EditSickLeavesOperationRequest;

  try {
    const data = await api.editSickLeaves(body);
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
| **editSickLeavesRequest** | [EditSickLeavesRequest](EditSickLeavesRequest.md) |  | [Optional] |

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


## getEditSickLeaveTypesStatus

> MultiWriteRequestResponse getEditSickLeaveTypesStatus(jobId)

GET Sick Leave Types Jobs

After a POST or PUT request to the /sick-leaves/sick-leave-types endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { GetEditSickLeaveTypesStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditSickLeaveTypesStatusRequest;

  try {
    const data = await api.getEditSickLeaveTypesStatus(body);
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
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditSickLeavesStatus

> GetEditAbsencesStatus200Response getEditSickLeavesStatus(jobId)

GET Sick Leaves Jobs

After a POST or PUT request to the /sick-leaves endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { GetEditSickLeavesStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditSickLeavesStatusRequest;

  try {
    const data = await api.getEditSickLeavesStatus(body);
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


## getSickLeave

> SickLeave getSickLeave(number)

GET Single Sick Leave

Return the data of a specific sick leave by the given unique number.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { GetSickLeaveRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // string | The unique identifier of the sick leave. Consists of the person\'s license number before the underscore and the running sick leave number for the respective person after the underscore.
    number: number_example,
  } satisfies GetSickLeaveRequest;

  try {
    const data = await api.getSickLeave(body);
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
| **number** | `string` | The unique identifier of the sick leave. Consists of the person\&#39;s license number before the underscore and the running sick leave number for the respective person after the underscore. | [Defaults to `undefined`] |

### Return type

[**SickLeave**](SickLeave.md)

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


## listSickLeaveTypes

> ListSickLeaveTypesResponse listSickLeaveTypes(onlyActive)

GET Sick Leave Types

Lists all sick leave types defined for the caller\&#39;s customer account in HR WORKS. The keys returned by this action can be used as filter values for other absence actions.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { ListSickLeaveTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // boolean | If set to false, the response also contains sick leaves types that are deactivated. (optional)
    onlyActive: true,
  } satisfies ListSickLeaveTypesRequest;

  try {
    const data = await api.listSickLeaveTypes(body);
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
| **onlyActive** | `boolean` | If set to false, the response also contains sick leaves types that are deactivated. | [Optional] [Defaults to `true`] |

### Return type

[**ListSickLeaveTypesResponse**](ListSickLeaveTypesResponse.md)

### Authorization

[BearerJWT](../README.md#BearerJWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Success response. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSickLeaves

> { [key: string]: Array&lt;SickLeavesDateIntervalData&gt;; } listSickLeaves(beginDate, endDate, persons, types, count, usePersonnelNumbers, interval, onlyActive, page, statusFilter)

GET Sick Leaves

Returns a list of sick leaves for the specified persons in the specified date interval.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { ListSickLeavesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // Array<string> | This parameter can be used to apply a filter to the result by specifying a list of sickness type identifiers/keys. If set, only sick leaves matching one of those keys will be returned. Note: The sick leave type keys can be retrieved via the /sick-leaves/sick-leave-types endpoint. (optional)
    types: ...,
    // boolean | If set to \"true\", this action will return the cumulated working days count for each sick leave type instead of the sickness details. This impacts the structure of the API response. (optional)
    count: true,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
    // Array<SickLeaveStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
  } satisfies ListSickLeavesRequest;

  try {
    const data = await api.listSickLeaves(body);
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
| **types** | `Array<string>` | This parameter can be used to apply a filter to the result by specifying a list of sickness type identifiers/keys. If set, only sick leaves matching one of those keys will be returned. Note: The sick leave type keys can be retrieved via the /sick-leaves/sick-leave-types endpoint. | [Optional] |
| **count** | `boolean` | If set to \&quot;true\&quot;, this action will return the cumulated working days count for each sick leave type instead of the sickness details. This impacts the structure of the API response. | [Optional] [Defaults to `false`] |
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **statusFilter** | `Array<SickLeaveStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |

### Return type

**{ [key: string]: Array<SickLeavesDateIntervalData>; }**

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


## listSickLeavesAccumulated

> { [key: string]: Array&lt;AccumulatedSickLeavesDateIntervalData&gt;; } listSickLeavesAccumulated(beginDate, endDate, persons, types, usePersonnelNumbers, interval, page, statusFilter, onlyActive)

GET Accumulated Sick Leaves

Returns a list of cumulated working days count for each sick leaves type for the specified persons in the specified date interval.

### Example

```ts
import {
  Configuration,
  SickLeavesApi,
} from '@hrworks/auto-client';
import type { ListSickLeavesAccumulatedRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SickLeavesApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // Array<string> | This parameter can be used to apply a filter to the result by specifying a list of sickness type identifiers/keys. If set, only sick leaves matching one of those keys will be returned. Note: The sick leave type keys can be retrieved via the /sick-leaves/sick-leave-types endpoint. (optional)
    types: ...,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
    // Array<SickLeaveStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
  } satisfies ListSickLeavesAccumulatedRequest;

  try {
    const data = await api.listSickLeavesAccumulated(body);
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
| **types** | `Array<string>` | This parameter can be used to apply a filter to the result by specifying a list of sickness type identifiers/keys. If set, only sick leaves matching one of those keys will be returned. Note: The sick leave type keys can be retrieved via the /sick-leaves/sick-leave-types endpoint. | [Optional] |
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `undefined`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **statusFilter** | `Array<SickLeaveStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |

### Return type

**{ [key: string]: Array<AccumulatedSickLeavesDateIntervalData>; }**

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

