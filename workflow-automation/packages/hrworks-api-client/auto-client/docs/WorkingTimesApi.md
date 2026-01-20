# WorkingTimesApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createProjectCustomers**](WorkingTimesApi.md#createprojectcustomers) | **POST** /v2/working-times/projects/customers | POST Project Customers |
| [**createTimeTrackingProjectAssignments**](WorkingTimesApi.md#createtimetrackingprojectassignmentsoperation) | **POST** /v2/working-times/projects/assignments | POST Time Tracking Project Assignments |
| [**createTimeTrackingProjects**](WorkingTimesApi.md#createtimetrackingprojectsoperation) | **POST** /v2/working-times/projects | POST Time Tracking Projects |
| [**createWorkingTimes**](WorkingTimesApi.md#createworkingtimesoperation) | **POST** /v2/working-times | POST Working Times |
| [**deleteWorkingTimes**](WorkingTimesApi.md#deleteworkingtimes) | **DELETE** /v2/working-times | DELETE Working Times |
| [**editProjectCustomers**](WorkingTimesApi.md#editprojectcustomers) | **PUT** /v2/working-times/projects/customers | PUT Project Customers |
| [**editWorkingTimes**](WorkingTimesApi.md#editworkingtimesoperation) | **PUT** /v2/working-times | PUT Working Times |
| [**getCreateProjectCustomersJobStatus**](WorkingTimesApi.md#getcreateprojectcustomersjobstatus) | **GET** /v2/working-times/projects/customers/jobs/{jobId} | GET Project Customers Jobs |
| [**getCreateWorkingTimesStatus**](WorkingTimesApi.md#getcreateworkingtimesstatus) | **GET** /v2/working-times/jobs/{jobId} | GET Working Times Jobs |
| [**getEditTimeTrackingProjectAssignmentsStatus**](WorkingTimesApi.md#getedittimetrackingprojectassignmentsstatus) | **GET** /v2/working-times/projects/assignments/jobs/{jobId} | GET Time Tracking Project Assignment Jobs |
| [**getEditTimeTrackingProjectsStatus**](WorkingTimesApi.md#getedittimetrackingprojectsstatus) | **GET** /v2/working-times/projects/jobs/{jobId} | GET Time Tracking Project Jobs |
| [**getPersonsTimeAccounts**](WorkingTimesApi.md#getpersonstimeaccounts) | **GET** /v2/working-times/time-accounts | GET Time Accounts |
| [**getProjectCustomer**](WorkingTimesApi.md#getprojectcustomer) | **GET** /v2/working-times/projects/customers/{customerNumber} | GET Single Project Customer |
| [**getSingleTimeTrackingProject**](WorkingTimesApi.md#getsingletimetrackingproject) | **GET** /v2/working-times/projects/{id} | GET Single Time Tracking Project |
| [**getTimeTrackingProjects**](WorkingTimesApi.md#gettimetrackingprojects) | **GET** /v2/working-times/projects | GET Time Tracking Projects |
| [**getWorkingTimeRegulations**](WorkingTimesApi.md#getworkingtimeregulations) | **GET** /v2/working-times/time-recording-regulations | GET Time Recording Regulations |
| [**getWorkingTimes**](WorkingTimesApi.md#getworkingtimes) | **GET** /v2/working-times | GET Working Times |
| [**listProjectCustomers**](WorkingTimesApi.md#listprojectcustomers) | **GET** /v2/working-times/projects/customers | GET Project Customers |
| [**listWorkingTimeKiosks**](WorkingTimesApi.md#listworkingtimekiosks) | **GET** /v2/working-times/kiosks | GET Time Tracking Kiosks |



## createProjectCustomers

> JobIdObject createProjectCustomers(createTimeTrackingProjectCustomersRequest)

POST Project Customers

Create new project customers in HR WORKS.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { CreateProjectCustomersRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // CreateTimeTrackingProjectCustomersRequest | Collection of project customers data.
    createTimeTrackingProjectCustomersRequest: ...,
  } satisfies CreateProjectCustomersRequest;

  try {
    const data = await api.createProjectCustomers(body);
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
| **createTimeTrackingProjectCustomersRequest** | [CreateTimeTrackingProjectCustomersRequest](CreateTimeTrackingProjectCustomersRequest.md) | Collection of project customers data. | |

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


## createTimeTrackingProjectAssignments

> JobIdObject createTimeTrackingProjectAssignments(createTimeTrackingProjectAssignmentsRequest)

POST Time Tracking Project Assignments

Add persons to project teams.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { CreateTimeTrackingProjectAssignmentsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // CreateTimeTrackingProjectAssignmentsRequest | An array of time tracking project assignments to create.
    createTimeTrackingProjectAssignmentsRequest: ...,
  } satisfies CreateTimeTrackingProjectAssignmentsOperationRequest;

  try {
    const data = await api.createTimeTrackingProjectAssignments(body);
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
| **createTimeTrackingProjectAssignmentsRequest** | [CreateTimeTrackingProjectAssignmentsRequest](CreateTimeTrackingProjectAssignmentsRequest.md) | An array of time tracking project assignments to create. | |

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


## createTimeTrackingProjects

> JobIdObject createTimeTrackingProjects(createTimeTrackingProjectsRequest)

POST Time Tracking Projects

Create time tracking projects.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { CreateTimeTrackingProjectsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // CreateTimeTrackingProjectsRequest | An array of time tracking projects to create.
    createTimeTrackingProjectsRequest: ...,
  } satisfies CreateTimeTrackingProjectsOperationRequest;

  try {
    const data = await api.createTimeTrackingProjects(body);
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
| **createTimeTrackingProjectsRequest** | [CreateTimeTrackingProjectsRequest](CreateTimeTrackingProjectsRequest.md) | An array of time tracking projects to create. | |

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


## createWorkingTimes

> JobIdObject createWorkingTimes(createWorkingTimesRequest)

POST Working Times

Create working times for persons in HR WORKS. Limits: The maximum number of working times that can be created with a single API call is 1000.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { CreateWorkingTimesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // CreateWorkingTimesRequest | Collection of create working times data.
    createWorkingTimesRequest: ...,
  } satisfies CreateWorkingTimesOperationRequest;

  try {
    const data = await api.createWorkingTimes(body);
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
| **createWorkingTimesRequest** | [CreateWorkingTimesRequest](CreateWorkingTimesRequest.md) | Collection of create working times data. | |

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


## deleteWorkingTimes

> JobIdObject deleteWorkingTimes(numbers)

DELETE Working Times

Delete multiple working times for persons in HR WORKS. Limits: The maximum number of working times that can be deleted with a single API call is 1000.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { DeleteWorkingTimesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // Array<string> | A list of working time numbers to delete. The numbers consist of the personnel number before the underscore and the beginDateAndTime formatted as Unix Time Seconds after the underscore (e.g. \"1_1683093600\", where 1 is the personnel number and \"1683093600\" is the begin date and time of the working time).
    numbers: ...,
  } satisfies DeleteWorkingTimesRequest;

  try {
    const data = await api.deleteWorkingTimes(body);
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
| **numbers** | `Array<string>` | A list of working time numbers to delete. The numbers consist of the personnel number before the underscore and the beginDateAndTime formatted as Unix Time Seconds after the underscore (e.g. \&quot;1_1683093600\&quot;, where 1 is the personnel number and \&quot;1683093600\&quot; is the begin date and time of the working time). | |

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

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editProjectCustomers

> JobIdObject editProjectCustomers(editTimeTrackingProjectCustomersRequest)

PUT Project Customers

Edit project customers in HR WORKS.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { EditProjectCustomersRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // EditTimeTrackingProjectCustomersRequest | Collection of project customers data.
    editTimeTrackingProjectCustomersRequest: ...,
  } satisfies EditProjectCustomersRequest;

  try {
    const data = await api.editProjectCustomers(body);
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
| **editTimeTrackingProjectCustomersRequest** | [EditTimeTrackingProjectCustomersRequest](EditTimeTrackingProjectCustomersRequest.md) | Collection of project customers data. | |

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


## editWorkingTimes

> JobIdObject editWorkingTimes(editWorkingTimesRequest)

PUT Working Times

Edit already existing working times for persons in HR WORKS. Limits: The maximum number of working times that can be edited with a single API call is 1000.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { EditWorkingTimesOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // EditWorkingTimesRequest | Collection of edit working times data.
    editWorkingTimesRequest: ...,
  } satisfies EditWorkingTimesOperationRequest;

  try {
    const data = await api.editWorkingTimes(body);
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
| **editWorkingTimesRequest** | [EditWorkingTimesRequest](EditWorkingTimesRequest.md) | Collection of edit working times data. | |

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


## getCreateProjectCustomersJobStatus

> MultiWriteRequestResponse getCreateProjectCustomersJobStatus(jobId)

GET Project Customers Jobs

After a POST or PUT request to the /working-times/projects/customers endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetCreateProjectCustomersJobStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetCreateProjectCustomersJobStatusRequest;

  try {
    const data = await api.getCreateProjectCustomersJobStatus(body);
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


## getCreateWorkingTimesStatus

> GetEditCostCentersStatus200Response getCreateWorkingTimesStatus(jobId)

GET Working Times Jobs

After a POST request to the /working-times endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetCreateWorkingTimesStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetCreateWorkingTimesStatusRequest;

  try {
    const data = await api.getCreateWorkingTimesStatus(body);
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


## getEditTimeTrackingProjectAssignmentsStatus

> MultiWriteRequestResponse getEditTimeTrackingProjectAssignmentsStatus(jobId)

GET Time Tracking Project Assignment Jobs

After a POST request to the /working-times/projects/assignments endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetEditTimeTrackingProjectAssignmentsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditTimeTrackingProjectAssignmentsStatusRequest;

  try {
    const data = await api.getEditTimeTrackingProjectAssignmentsStatus(body);
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
| **200** | Success response. The result can be either pending (containing no response data yet) or finished (containing error or results of the successful write request). |  -  |
| **400** | This error is only returned by /jobs endpoints. The submitted jobId was invalid - no matching write request to the API could be found. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditTimeTrackingProjectsStatus

> MultiWriteRequestResponse getEditTimeTrackingProjectsStatus(jobId)

GET Time Tracking Project Jobs

After a POST request to the /working-times/projects endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetEditTimeTrackingProjectsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditTimeTrackingProjectsStatusRequest;

  try {
    const data = await api.getEditTimeTrackingProjectsStatus(body);
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
| **200** | Success response. The result can be either pending (containing no response data yet) or finished (containing error or results of the successful write request). |  -  |
| **400** | This error is only returned by /jobs endpoints. The submitted jobId was invalid - no matching write request to the API could be found. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPersonsTimeAccounts

> { [key: string]: Array&lt;TimeAccount&gt;; } getPersonsTimeAccounts(persons, usePersonnelNumbers, onlyActive, page, monthYears)

GET Time Accounts

Returns the time accounts of the specified persons.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetPersonsTimeAccountsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
    // Array<string> | List of month year combinations in the following format: YYYY-MM. Default: The current month. (optional)
    monthYears: ...,
  } satisfies GetPersonsTimeAccountsRequest;

  try {
    const data = await api.getPersonsTimeAccounts(body);
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
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `true`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **monthYears** | `Array<string>` | List of month year combinations in the following format: YYYY-MM. Default: The current month. | [Optional] |

### Return type

**{ [key: string]: Array<TimeAccount>; }**

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


## getProjectCustomer

> TimeTrackingProjectCustomer getProjectCustomer(customerNumber)

GET Single Project Customer

Returns a time tracking project customer by the customer number.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetProjectCustomerRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // string | The customer number of the project customer.
    customerNumber: customerNumber_example,
  } satisfies GetProjectCustomerRequest;

  try {
    const data = await api.getProjectCustomer(body);
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
| **customerNumber** | `string` | The customer number of the project customer. | [Defaults to `undefined`] |

### Return type

[**TimeTrackingProjectCustomer**](TimeTrackingProjectCustomer.md)

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


## getSingleTimeTrackingProject

> TimeTrackingProject getSingleTimeTrackingProject(id)

GET Single Time Tracking Project

Return the data of a specific time tracking project by the given unique id.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetSingleTimeTrackingProjectRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // string | The unique id of the time tracking project.
    id: id_example,
  } satisfies GetSingleTimeTrackingProjectRequest;

  try {
    const data = await api.getSingleTimeTrackingProject(body);
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
| **id** | `string` | The unique id of the time tracking project. | [Defaults to `undefined`] |

### Return type

[**TimeTrackingProject**](TimeTrackingProject.md)

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


## getTimeTrackingProjects

> GetTimeTrackingProjectsResponse getTimeTrackingProjects(beginDate, endDate, numbers, statusFilter, projectType, page, projectIds, projectManagerPersonnelNumber, projectCustomerId)

GET Time Tracking Projects

Returns a list of time tracking projects in the specified date interval.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetTimeTrackingProjectsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // Date | The begin date of the interval to look for time tracking projects. Date in YYYY-MM-DD format. (optional)
    beginDate: 2013-10-20,
    // Date | The end date of the interval to look for time tracking projects. Date in YYYY-MM-DD format. (optional)
    endDate: 2013-10-20,
    // Array<string> | Set this parameter to only get the time tracking projects with the matching projectNumber. (optional)
    numbers: ...,
    // Array<TimeTrackingProjectStatus> | Set this parameter to only get time tracking projects with the given status. (optional)
    statusFilter: ...,
    // TimeTrackingProjectType | This parameter can be used to apply a filter to the result by specifying a certain project type. (optional)
    projectType: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
    // Array<string> | Set this parameter to recieve only the time tracking projects with the matching projectIds. (optional)
    projectIds: ...,
    // string | Set this parameter to only receive the time tracking projects with the matching project manager for the personnelNumber. (optional)
    projectManagerPersonnelNumber: projectManagerPersonnelNumber_example,
    // string | Set this parameter to only receive the time tracking projects with the matching project customer for the id (optional)
    projectCustomerId: projectCustomerId_example,
  } satisfies GetTimeTrackingProjectsRequest;

  try {
    const data = await api.getTimeTrackingProjects(body);
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
| **beginDate** | `Date` | The begin date of the interval to look for time tracking projects. Date in YYYY-MM-DD format. | [Optional] [Defaults to `undefined`] |
| **endDate** | `Date` | The end date of the interval to look for time tracking projects. Date in YYYY-MM-DD format. | [Optional] [Defaults to `undefined`] |
| **numbers** | `Array<string>` | Set this parameter to only get the time tracking projects with the matching projectNumber. | [Optional] |
| **statusFilter** | `Array<TimeTrackingProjectStatus>` | Set this parameter to only get time tracking projects with the given status. | [Optional] |
| **projectType** | `TimeTrackingProjectType` | This parameter can be used to apply a filter to the result by specifying a certain project type. | [Optional] [Defaults to `undefined`] [Enum: subProject, parentProject, parentProjectWithoutSubProjects] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **projectIds** | `Array<string>` | Set this parameter to recieve only the time tracking projects with the matching projectIds. | [Optional] |
| **projectManagerPersonnelNumber** | `string` | Set this parameter to only receive the time tracking projects with the matching project manager for the personnelNumber. | [Optional] [Defaults to `undefined`] |
| **projectCustomerId** | `string` | Set this parameter to only receive the time tracking projects with the matching project customer for the id | [Optional] [Defaults to `undefined`] |

### Return type

[**GetTimeTrackingProjectsResponse**](GetTimeTrackingProjectsResponse.md)

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


## getWorkingTimeRegulations

> ListTimeRecordingRegulationsResponse getWorkingTimeRegulations()

GET Time Recording Regulations

Return all time recording regulations of the company.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetWorkingTimeRegulationsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  try {
    const data = await api.getWorkingTimeRegulations();
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

[**ListTimeRecordingRegulationsResponse**](ListTimeRecordingRegulationsResponse.md)

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


## getWorkingTimes

> { [key: string]: Array&lt;WorkingTimesDateIntervalData&gt;; } getWorkingTimes(beginDate, endDate, persons, types, usePersonnelNumbers, interval, page)

GET Working Times

Returns a list of working times for the specified persons in the specified date interval. &lt;p&gt;Note: Only persons with a time tracking regulation for the requested date interval will be part of the returned data.&lt;/p&gt;

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { GetWorkingTimesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // Date | The begin date of the interval to look for working times. Date in YYYY-MM-DD format.
    beginDate: 2013-10-20,
    // Date | The end date of the interval to look for working times. Date in YYYY-MM-DD format.
    endDate: 2013-10-20,
    // Array<string> | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. (optional)
    persons: ...,
    // Array<string> | The working time types to filter for. You can get a list of all working time types available for specific time recording regulations using the /working-times/time-recording-regulations endpoint. (optional)
    types: ...,
    // boolean | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \'days\' will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if weeks was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies GetWorkingTimesRequest;

  try {
    const data = await api.getWorkingTimes(body);
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
| **beginDate** | `Date` | The begin date of the interval to look for working times. Date in YYYY-MM-DD format. | [Defaults to `undefined`] |
| **endDate** | `Date` | The end date of the interval to look for working times. Date in YYYY-MM-DD format. | [Defaults to `undefined`] |
| **persons** | `Array<string>` | The HR WORKS usernames of the persons to display data for. Note: Using the optional parameter usePersonnelNumbers, HR WORKS personnel numbers can be passed instead of HR WORKS usernames. | [Optional] |
| **types** | `Array<string>` | The working time types to filter for. You can get a list of all working time types available for specific time recording regulations using the /working-times/time-recording-regulations endpoint. | [Optional] |
| **usePersonnelNumbers** | `boolean` | If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&#39;days\&#39; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if weeks was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

**{ [key: string]: Array<WorkingTimesDateIntervalData>; }**

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


## listProjectCustomers

> GetTimeTrackingProjectCustomersResponse listProjectCustomers(onlyActive)

GET Project Customers

Returns a list of time tracking project customers.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { ListProjectCustomersRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  const body = {
    // boolean | Set this parameter to false to also receive inactive project customers (optional)
    onlyActive: true,
  } satisfies ListProjectCustomersRequest;

  try {
    const data = await api.listProjectCustomers(body);
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
| **onlyActive** | `boolean` | Set this parameter to false to also receive inactive project customers | [Optional] [Defaults to `true`] |

### Return type

[**GetTimeTrackingProjectCustomersResponse**](GetTimeTrackingProjectCustomersResponse.md)

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


## listWorkingTimeKiosks

> ListWorkingTimeKiosksResponse listWorkingTimeKiosks()

GET Time Tracking Kiosks

Return all kiosks of the company.

### Example

```ts
import {
  Configuration,
  WorkingTimesApi,
} from '@hrworks/auto-client';
import type { ListWorkingTimeKiosksRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkingTimesApi(config);

  try {
    const data = await api.listWorkingTimeKiosks();
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

[**ListWorkingTimeKiosksResponse**](ListWorkingTimeKiosksResponse.md)

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

