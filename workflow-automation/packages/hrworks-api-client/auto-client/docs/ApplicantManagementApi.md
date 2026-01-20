# ApplicantManagementApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createJobApplicationFiles**](ApplicantManagementApi.md#createjobapplicationfiles) | **POST** /v2/applicant-management/job-applications/{id}/files | POST Job Application Files |
| [**createJobApplications**](ApplicantManagementApi.md#createjobapplicationsoperation) | **POST** /v2/applicant-management/job-applications | POST Job Applications |
| [**getApplicant**](ApplicantManagementApi.md#getapplicant) | **GET** /v2/applicant-management/applicants/{uuid} | GET Single Applicant |
| [**getEditJobApplicationsStatus**](ApplicantManagementApi.md#geteditjobapplicationsstatus) | **GET** /v2/applicant-management/job-applications/jobs/{jobId} | GET Job Applications Jobs |
| [**getPost**](ApplicantManagementApi.md#getpost) | **GET** /v2/applicant-management/posts/{uuid} | GET Single Post |
| [**listApplicants**](ApplicantManagementApi.md#listapplicants) | **GET** /v2/applicant-management/applicants | GET Applicants |
| [**listJobApplications**](ApplicantManagementApi.md#listjobapplications) | **GET** /v2/applicant-management/job-applications | GET Job Applications |
| [**listPosts**](ApplicantManagementApi.md#listposts) | **GET** /v2/applicant-management/posts | GET Posts |



## createJobApplicationFiles

> JobIdObject createJobApplicationFiles(contentType, fileName, id, url, body)

POST Job Application Files

Create a new file for a job application in HR WORKS by sending the binary data in body or an URL to download the file from.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { CreateJobApplicationFilesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // string | The Mime-type of the file, e.g. \'application/pdf\'
    contentType: application/pdf,
    // string | The name of the file to display in HR WORKS.
    fileName: testFile.pdf,
    // string | The id of the job application that the uploaded file belongs to.
    id: id_example,
    // string | The url of the document (required if the file is not sent via the request body). (optional)
    url: url_example,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies CreateJobApplicationFilesRequest;

  try {
    const data = await api.createJobApplicationFiles(body);
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
| **contentType** | `string` | The Mime-type of the file, e.g. \&#39;application/pdf\&#39; | [Defaults to `undefined`] |
| **fileName** | `string` | The name of the file to display in HR WORKS. | [Defaults to `undefined`] |
| **id** | `string` | The id of the job application that the uploaded file belongs to. | [Defaults to `undefined`] |
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
| **200** | Success response. The jobId returned with this call can be used to query the job-applications/jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createJobApplications

> JobIdObject createJobApplications(createJobApplicationsRequest)

POST Job Applications

Create one or multiple job applications for applicant management

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { CreateJobApplicationsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // CreateJobApplicationsRequest (optional)
    createJobApplicationsRequest: ...,
  } satisfies CreateJobApplicationsOperationRequest;

  try {
    const data = await api.createJobApplications(body);
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
| **createJobApplicationsRequest** | [CreateJobApplicationsRequest](CreateJobApplicationsRequest.md) |  | [Optional] |

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


## getApplicant

> Applicant getApplicant(uuid)

GET Single Applicant

Returns the data of one specific applicant.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { GetApplicantRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // string | The unique identifier of the person in HR WORKS. This identifier does not change, when the applicant is converted to an employee person.
    uuid: uuid_example,
  } satisfies GetApplicantRequest;

  try {
    const data = await api.getApplicant(body);
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
| **uuid** | `string` | The unique identifier of the person in HR WORKS. This identifier does not change, when the applicant is converted to an employee person. | [Defaults to `undefined`] |

### Return type

[**Applicant**](Applicant.md)

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


## getEditJobApplicationsStatus

> GetEditPersonsStatus200Response getEditJobApplicationsStatus(jobId)

GET Job Applications Jobs

After a POST request to the /applicant-management/job-applications endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { GetEditJobApplicationsStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditJobApplicationsStatusRequest;

  try {
    const data = await api.getEditJobApplicationsStatus(body);
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


## getPost

> Post getPost(uuid)

GET Single Post

Returns the data of a single post with the given id.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { GetPostRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // string | The uuid or id of the post in HR WORKS. The unique identifier cannot be changed. The passing of the id is deprecated.
    uuid: uuid_example,
  } satisfies GetPostRequest;

  try {
    const data = await api.getPost(body);
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
| **uuid** | `string` | The uuid or id of the post in HR WORKS. The unique identifier cannot be changed. The passing of the id is deprecated. | [Defaults to `undefined`] |

### Return type

[**Post**](Post.md)

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


## listApplicants

> ListApplicantsResponse listApplicants(applicants, statusFilter, page)

GET Applicants

Returns a list of applicants. Only applicants with job applications are returned.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { ListApplicantsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // Array<string> | The UUIDs of the applicants to display data for. (optional)
    applicants: ...,
    // Array<JobApplicationStatus> | If set, only applicants with a job application in the specified status will be returned. (optional)
    statusFilter: ...,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies ListApplicantsRequest;

  try {
    const data = await api.listApplicants(body);
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
| **applicants** | `Array<string>` | The UUIDs of the applicants to display data for. | [Optional] |
| **statusFilter** | `Array<JobApplicationStatus>` | If set, only applicants with a job application in the specified status will be returned. | [Optional] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

[**ListApplicantsResponse**](ListApplicantsResponse.md)

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


## listJobApplications

> ListJobApplicationsResponse listJobApplications(page, posts, statusFilter)

GET Job Applications

List all job applications with the specified status and post.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { ListJobApplicationsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 56,
    // Array<string> | The IDs of the posts for which to return job applications. (optional)
    posts: ...,
    // Array<JobApplicationStatus> | The status identifiers for which to return job applications. (optional)
    statusFilter: ...,
  } satisfies ListJobApplicationsRequest;

  try {
    const data = await api.listJobApplications(body);
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
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |
| **posts** | `Array<string>` | The IDs of the posts for which to return job applications. | [Optional] |
| **statusFilter** | `Array<JobApplicationStatus>` | The status identifiers for which to return job applications. | [Optional] |

### Return type

[**ListJobApplicationsResponse**](ListJobApplicationsResponse.md)

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


## listPosts

> ListPostsResponse listPosts(onlyActive)

GET Posts

List all posts of the company.

### Example

```ts
import {
  Configuration,
  ApplicantManagementApi,
} from '@hrworks/auto-client';
import type { ListPostsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ApplicantManagementApi(config);

  const body = {
    // boolean | Set this parameter to either return only active posts (true) or all posts (false). The default value is true (optional)
    onlyActive: true,
  } satisfies ListPostsRequest;

  try {
    const data = await api.listPosts(body);
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
| **onlyActive** | `boolean` | Set this parameter to either return only active posts (true) or all posts (false). The default value is true | [Optional] [Defaults to `true`] |

### Return type

[**ListPostsResponse**](ListPostsResponse.md)

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

