# WageSalaryApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPayrollFile**](WageSalaryApi.md#createpayrollfile) | **POST** /v2/payroll/files | POST Payroll File |
| [**getEditPayrollFilesStatus**](WageSalaryApi.md#geteditpayrollfilesstatus) | **GET** /v2/payroll/jobs/{jobId} | GET Payroll Files Jobs |
| [**listWageAndSalaryTypes**](WageSalaryApi.md#listwageandsalarytypes) | **GET** /v2/wage-and-salary/types | GET Wage Types |



## createPayrollFile

> JobIdObject createPayrollFile(fileName, year, contentType, url, personnelNumber, personIdentifier, personIdentifierType, month, body)

POST Payroll File

Create a new payroll file by sending the binary data in body or an URL to download the file from.

### Example

```ts
import {
  Configuration,
  WageSalaryApi,
} from '@hrworks/auto-client';
import type { CreatePayrollFileRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WageSalaryApi(config);

  const body = {
    // string | The name of the file to display in HR WORKS.
    fileName: testFile.pdf,
    // number | The year that the payroll file belongs to.
    year: 2023,
    // string | The Mime-type of the file, e.g. \'application/pdf\' (required if the file is sent via the request body) (optional)
    contentType: application/pdf,
    // string | The url to download the file from (required if the file is not sent via the request body). The value has to be url-encoded. (optional)
    url: url_example,
    // string | The personnelNumber of the person to add the payroll file for. Deprecated - use personIdentifierType and personIdentifier instead. (optional)
    personnelNumber: personnelNumber_example,
    // string | The identifier of the person to add the payroll file for. Use personIdentifierType to specify what type the value is. (optional)
    personIdentifier: personIdentifier_example,
    // PersonIdentifierType | The type of the person identifier. Default is uuid. (optional)
    personIdentifierType: personId,
    // number | The month index (value between 1 and 12) that the payroll file belongs to. If no month is given, the file is assumed to refer to the entire year. (optional)
    month: 12,
    // Blob (optional)
    body: BINARY_DATA_HERE,
  } satisfies CreatePayrollFileRequest;

  try {
    const data = await api.createPayrollFile(body);
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
| **year** | `number` | The year that the payroll file belongs to. | [Defaults to `undefined`] |
| **contentType** | `string` | The Mime-type of the file, e.g. \&#39;application/pdf\&#39; (required if the file is sent via the request body) | [Optional] [Defaults to `undefined`] |
| **url** | `string` | The url to download the file from (required if the file is not sent via the request body). The value has to be url-encoded. | [Optional] [Defaults to `undefined`] |
| **personnelNumber** | `string` | The personnelNumber of the person to add the payroll file for. Deprecated - use personIdentifierType and personIdentifier instead. | [Optional] [Defaults to `undefined`] |
| **personIdentifier** | `string` | The identifier of the person to add the payroll file for. Use personIdentifierType to specify what type the value is. | [Optional] [Defaults to `undefined`] |
| **personIdentifierType** | `PersonIdentifierType` | The type of the person identifier. Default is uuid. | [Optional] [Defaults to `undefined`] [Enum: personId, personnelNumber, personLicenseNumber, uuid, personIdentifierForKiosk] |
| **month** | `number` | The month index (value between 1 and 12) that the payroll file belongs to. If no month is given, the file is assumed to refer to the entire year. | [Optional] [Defaults to `undefined`] |
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
| **200** | Success response. The jobId returned with this call can be used to query the payroll/files/jobs endpoint for the result of the write operation. |  -  |
| **0** | Error payload. See #/responses for a list of general API errors. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEditPayrollFilesStatus

> FileUploadRequestResponse getEditPayrollFilesStatus(jobId)

GET Payroll Files Jobs

After a POST request to the /payroll/files endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  WageSalaryApi,
} from '@hrworks/auto-client';
import type { GetEditPayrollFilesStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WageSalaryApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditPayrollFilesStatusRequest;

  try {
    const data = await api.getEditPayrollFilesStatus(body);
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

[**FileUploadRequestResponse**](FileUploadRequestResponse.md)

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


## listWageAndSalaryTypes

> ListWageAndSalaryTypesResponse listWageAndSalaryTypes(onlyActive)

GET Wage Types

Returns all wage types.

### Example

```ts
import {
  Configuration,
  WageSalaryApi,
} from '@hrworks/auto-client';
import type { ListWageAndSalaryTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WageSalaryApi(config);

  const body = {
    // boolean | Boolean parameter to decide if only active wage types should be returned. (optional)
    onlyActive: true,
  } satisfies ListWageAndSalaryTypesRequest;

  try {
    const data = await api.listWageAndSalaryTypes(body);
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
| **onlyActive** | `boolean` | Boolean parameter to decide if only active wage types should be returned. | [Optional] [Defaults to `undefined`] |

### Return type

[**ListWageAndSalaryTypesResponse**](ListWageAndSalaryTypesResponse.md)

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

