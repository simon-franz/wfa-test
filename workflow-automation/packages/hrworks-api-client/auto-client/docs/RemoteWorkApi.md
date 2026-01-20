# RemoteWorkApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createRemoteWork**](RemoteWorkApi.md#createremoteworkoperation) | **POST** /v2/remote-work | POST Remote Work |
| [**deleteSingleRemoteWork**](RemoteWorkApi.md#deletesingleremotework) | **DELETE** /v2/remote-work/{number} | DELETE Single Remote Work |
| [**editRemoteWork**](RemoteWorkApi.md#editremoteworkoperation) | **PUT** /v2/remote-work | PUT Remote Work |
| [**editSingleRemoteWork**](RemoteWorkApi.md#editsingleremotework) | **PUT** /v2/remote-work/{number} | PUT Single Remote Work |
| [**getAccumulatedRemoteWork**](RemoteWorkApi.md#getaccumulatedremotework) | **GET** /v2/remote-work/accumulated-values | GET Remote Work Accumulated Values |
| [**getEditRemoteWorkStatus**](RemoteWorkApi.md#geteditremoteworkstatus) | **GET** /v2/remote-work/jobs/{jobId} | GET Remote Work Jobs |
| [**getRemoteWork**](RemoteWorkApi.md#getremotework) | **GET** /v2/remote-work | GET Remote Work |
| [**getSingleRemoteWork**](RemoteWorkApi.md#getsingleremotework) | **GET** /v2/remote-work/{number} | GET Single Remote Work |



## createRemoteWork

> JobIdObject createRemoteWork(createRemoteWorkRequest)

POST Remote Work

Create new remote work in HR WORKS. Refer to the data type RemoteWork for a comprehensive list of attributes that can be set. Attributes that are not set/included in the create request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { CreateRemoteWorkOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // CreateRemoteWorkRequest (optional)
    createRemoteWorkRequest: ...,
  } satisfies CreateRemoteWorkOperationRequest;

  try {
    const data = await api.createRemoteWork(body);
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
| **createRemoteWorkRequest** | [CreateRemoteWorkRequest](CreateRemoteWorkRequest.md) |  | [Optional] |

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


## deleteSingleRemoteWork

> JobIdObject deleteSingleRemoteWork(number)

DELETE Single Remote Work

Delete a single remote work in HR WORKS.

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { DeleteSingleRemoteWorkRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // string | The unique identifier of the remote work. Consists of the person\'s license number before the underscore and the running remote work number for the respective person after the underscore.
    number: number_example,
  } satisfies DeleteSingleRemoteWorkRequest;

  try {
    const data = await api.deleteSingleRemoteWork(body);
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
| **number** | `string` | The unique identifier of the remote work. Consists of the person\&#39;s license number before the underscore and the running remote work number for the respective person after the underscore. | [Defaults to `undefined`] |

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


## editRemoteWork

> JobIdObject editRemoteWork(editRemoteWorkRequest)

PUT Remote Work

Edit remote work objects in HR WORKS. Refer to the data type EditRemoteWorkData for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { EditRemoteWorkOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // EditRemoteWorkRequest (optional)
    editRemoteWorkRequest: ...,
  } satisfies EditRemoteWorkOperationRequest;

  try {
    const data = await api.editRemoteWork(body);
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
| **editRemoteWorkRequest** | [EditRemoteWorkRequest](EditRemoteWorkRequest.md) |  | [Optional] |

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


## editSingleRemoteWork

> JobIdObject editSingleRemoteWork(number, remoteWorkData)

PUT Single Remote Work

Edit a remote work in HR WORKS. Refer to the data type RemoteWork for a comprehensive list of attributes that can be set. Attributes that are not set/included in the edit request are ignored (with the exception of mandatory attributes).

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { EditSingleRemoteWorkRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // string | The unique identifier of the remote work. Consists of the person\'s license number before the underscore and the running remote work number for the respective person after the underscore.
    number: number_example,
    // RemoteWorkData (optional)
    remoteWorkData: ...,
  } satisfies EditSingleRemoteWorkRequest;

  try {
    const data = await api.editSingleRemoteWork(body);
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
| **number** | `string` | The unique identifier of the remote work. Consists of the person\&#39;s license number before the underscore and the running remote work number for the respective person after the underscore. | [Defaults to `undefined`] |
| **remoteWorkData** | [RemoteWorkData](RemoteWorkData.md) |  | [Optional] |

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


## getAccumulatedRemoteWork

> { [key: string]: Array&lt;AccumulatedRemoteWorkDateIntervalData&gt;; } getAccumulatedRemoteWork(beginDate, endDate, persons, usePersonnelNumbers, interval, page, statusFilter, onlyActive)

GET Remote Work Accumulated Values

Returns a list of cumulated working days count for each remote work instance in the specified date interval.

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { GetAccumulatedRemoteWorkRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
    // Array<RemoteWorkStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
  } satisfies GetAccumulatedRemoteWorkRequest;

  try {
    const data = await api.getAccumulatedRemoteWork(body);
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
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `undefined`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **statusFilter** | `Array<RemoteWorkStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |

### Return type

**{ [key: string]: Array<AccumulatedRemoteWorkDateIntervalData>; }**

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


## getEditRemoteWorkStatus

> GetEditRemoteWorkStatus200Response getEditRemoteWorkStatus(jobId)

GET Remote Work Jobs

After a POST or PUT request to the /remote-work endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { GetEditRemoteWorkStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditRemoteWorkStatusRequest;

  try {
    const data = await api.getEditRemoteWorkStatus(body);
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

[**GetEditRemoteWorkStatus200Response**](GetEditRemoteWorkStatus200Response.md)

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


## getRemoteWork

> { [key: string]: Array&lt;RemoteWorkDateIntervalData&gt;; } getRemoteWork(beginDate, endDate, persons, usePersonnelNumbers, interval, onlyActive, page, statusFilter)

GET Remote Work

Returns a list of remote work data in the specified date interval.

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { GetRemoteWorkRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
    // Array<RemoteWorkStatus> | If specified, only values matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
  } satisfies GetRemoteWorkRequest;

  try {
    const data = await api.getRemoteWork(body);
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
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **statusFilter** | `Array<RemoteWorkStatus>` | If specified, only values matching one of the selected status values will be returned. | [Optional] |

### Return type

**{ [key: string]: Array<RemoteWorkDateIntervalData>; }**

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


## getSingleRemoteWork

> RemoteWork getSingleRemoteWork(number)

GET Single Remote Work

Return the data of a specific remote work instance by the given unique number.

### Example

```ts
import {
  Configuration,
  RemoteWorkApi,
} from '@hrworks/auto-client';
import type { GetSingleRemoteWorkRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new RemoteWorkApi(config);

  const body = {
    // string | The unique identifier of the remote work. Consists of the person\'s license number before the underscore and the running remote work number for the respective person after the underscore.
    number: number_example,
  } satisfies GetSingleRemoteWorkRequest;

  try {
    const data = await api.getSingleRemoteWork(body);
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
| **number** | `string` | The unique identifier of the remote work. Consists of the person\&#39;s license number before the underscore and the running remote work number for the respective person after the underscore. | [Defaults to `undefined`] |

### Return type

[**RemoteWork**](RemoteWork.md)

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

