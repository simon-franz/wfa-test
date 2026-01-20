# TravelExpensesApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getTravelExpense**](TravelExpensesApi.md#gettravelexpense) | **GET** /v2/travel-expenses/expense-reports/{number} | GET Single Expense Report |
| [**getTravelRequest**](TravelExpensesApi.md#gettravelrequest) | **GET** /v2/travel-expenses/travel-requests/{number} | GET Single Travel Request |
| [**listExpenseReports**](TravelExpensesApi.md#listexpensereports) | **GET** /v2/travel-expenses/expense-reports | GET Expense Reports |
| [**listReceiptTypes**](TravelExpensesApi.md#listreceipttypes) | **GET** /v2/travel-expenses/receipt-types | GET Receipt Types |
| [**listTravelRequests**](TravelExpensesApi.md#listtravelrequests) | **GET** /v2/travel-expenses/travel-requests | GET Travel Requests |



## getTravelExpense

> ExpenseReport getTravelExpense(number)

GET Single Expense Report

Return the data of a specific travel expense report by the given unique number.

### Example

```ts
import {
  Configuration,
  TravelExpensesApi,
} from '@hrworks/auto-client';
import type { GetTravelExpenseRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelExpensesApi(config);

  const body = {
    // string | The unique identifier of the travel expense report. Consists of the person\'s personnel number before and the trip number after the dash symbol.
    number: 1-1,
  } satisfies GetTravelExpenseRequest;

  try {
    const data = await api.getTravelExpense(body);
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
| **number** | `string` | The unique identifier of the travel expense report. Consists of the person\&#39;s personnel number before and the trip number after the dash symbol. | [Defaults to `undefined`] |

### Return type

[**ExpenseReport**](ExpenseReport.md)

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


## getTravelRequest

> TravelRequest getTravelRequest(number)

GET Single Travel Request

Return the data of a specific travel request by the given unique number.

### Example

```ts
import {
  Configuration,
  TravelExpensesApi,
} from '@hrworks/auto-client';
import type { GetTravelRequestRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelExpensesApi(config);

  const body = {
    // string | The unique identifier of the travel request. Consists of the person\'s personnel number before and the trip request number after the dash symbol.
    number: 1-1,
  } satisfies GetTravelRequestRequest;

  try {
    const data = await api.getTravelRequest(body);
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
| **number** | `string` | The unique identifier of the travel request. Consists of the person\&#39;s personnel number before and the trip request number after the dash symbol. | [Defaults to `undefined`] |

### Return type

[**TravelRequest**](TravelRequest.md)

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


## listExpenseReports

> { [key: string]: Array&lt;ExpenseReportsDateIntervalData&gt;; } listExpenseReports(beginDate, endDate, personIdentifierType, persons, statusFilter, usePersonnelNumbers, includeExpenseReportsWithoutTrip, interval, onlyActive, page)

GET Expense Reports

Returns a list of expense reports for the specified persons in the specified date interval.

### Example

```ts
import {
  Configuration,
  TravelExpensesApi,
} from '@hrworks/auto-client';
import type { ListExpenseReportsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelExpensesApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // PersonIdentifierType | Specifies the type of identifiers in the persons parameter. Default is personId. (optional)
    personIdentifierType: ...,
    // Array<string> | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. (optional)
    persons: ...,
    // Array<ExpenseReportStatus> | If specified, only expense reports matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // boolean | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // boolean | If set to true, the API response will include expense reports that are not associated with a physical trip and represent a collection of receipts. (optional)
    includeExpenseReportsWithoutTrip: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 20. (optional)
    page: 8.14,
  } satisfies ListExpenseReportsRequest;

  try {
    const data = await api.listExpenseReports(body);
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
| **statusFilter** | `Array<ExpenseReportStatus>` | If specified, only expense reports matching one of the selected status values will be returned. | [Optional] |
| **usePersonnelNumbers** | `boolean` | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **includeExpenseReportsWithoutTrip** | `boolean` | If set to true, the API response will include expense reports that are not associated with a physical trip and represent a collection of receipts. | [Optional] [Defaults to `undefined`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `undefined`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 20. | [Optional] [Defaults to `1`] |

### Return type

**{ [key: string]: Array<ExpenseReportsDateIntervalData>; }**

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


## listReceiptTypes

> ListReceiptTypesResponse listReceiptTypes(countryCodes, onlyActive, categories)

GET Receipt Types

Returns a list of receipt types.

### Example

```ts
import {
  Configuration,
  TravelExpensesApi,
} from '@hrworks/auto-client';
import type { ListReceiptTypesRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelExpensesApi(config);

  const body = {
    // Array<string> | An array of ISO 3166-1 alpha-3 country codes (e.g. DEU, IRL, USA) for which to return data. If not specified, data for all countries in the HR WORKS company will be returned. Country codes for which no corresponding country is found will be omitted. (optional)
    countryCodes: ...,
    // boolean | Set this parameter to false to also return receipt types that are not active. (optional)
    onlyActive: true,
    // Array<ReceiptCategory> | If specified, only receipt types matching one of the selected categories will be returned. (optional)
    categories: ...,
  } satisfies ListReceiptTypesRequest;

  try {
    const data = await api.listReceiptTypes(body);
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
| **countryCodes** | `Array<string>` | An array of ISO 3166-1 alpha-3 country codes (e.g. DEU, IRL, USA) for which to return data. If not specified, data for all countries in the HR WORKS company will be returned. Country codes for which no corresponding country is found will be omitted. | [Optional] |
| **onlyActive** | `boolean` | Set this parameter to false to also return receipt types that are not active. | [Optional] [Defaults to `true`] |
| **categories** | `Array<ReceiptCategory>` | If specified, only receipt types matching one of the selected categories will be returned. | [Optional] |

### Return type

[**ListReceiptTypesResponse**](ListReceiptTypesResponse.md)

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


## listTravelRequests

> { [key: string]: Array&lt;TravelRequestsDateIntervalData&gt;; } listTravelRequests(beginDate, endDate, personIdentifierType, persons, statusFilter, usePersonnelNumbers, interval, onlyActive, page)

GET Travel Requests

Returns a list of travel requests for the specified persons in the specified date interval.

### Example

```ts
import {
  Configuration,
  TravelExpensesApi,
} from '@hrworks/auto-client';
import type { ListTravelRequestsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TravelExpensesApi(config);

  const body = {
    // string | The starting date of the date interval. Note: The maximum date interval is one year.
    beginDate: beginDate_example,
    // string | The end date of the date interval. Note: The maximum date interval is one year.
    endDate: endDate_example,
    // PersonIdentifierType | Specifies the type of identifiers in the persons parameter. Default is personId. (optional)
    personIdentifierType: ...,
    // Array<string> | The identifiers of the persons to display data for. Use personIdentifierType to specify what type the values are. (optional)
    persons: ...,
    // Array<TravelRequestStatus> | If specified, only travel requests matching one of the selected status values will be returned. (optional)
    statusFilter: ...,
    // boolean | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. (optional)
    usePersonnelNumbers: true,
    // Interval | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \"days\" will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \"weeks\" was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. (optional)
    interval: ...,
    // boolean | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. (optional)
    onlyActive: true,
    // number | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. (optional)
    page: 8.14,
  } satisfies ListTravelRequestsRequest;

  try {
    const data = await api.listTravelRequests(body);
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
| **statusFilter** | `Array<TravelRequestStatus>` | If specified, only travel requests matching one of the selected status values will be returned. | [Optional] |
| **usePersonnelNumbers** | `boolean` | Deprecated - use personIdentifierType instead. If set to true, the API will assume the strings in the persons parameter to represent personnel numbers instead of HR WORKS usernames. | [Optional] [Defaults to `false`] |
| **interval** | `Interval` | Indicates whether the date interval should be split into smaller intervals like weeks or months. If this parameter is not set, the interval will not be split. Setting this parameter to \&quot;days\&quot; will shorten the maximum allowed interval size to 31 days. Note: The API does not perform any date interval adjustments. E.g., even if \&quot;weeks\&quot; was specified for the interval parameter, if the date interval specified by beginDate and endDate spans only two days, the data will only be computed for this two-day span. However, if those two days happen to be Monday and Sunday of different weeks, the result will be split accordingly. | [Optional] [Defaults to `undefined`] [Enum: days, weeks, months] |
| **onlyActive** | `boolean` | Set this parameter to false to return persons that have left the company and were set to gone in HR WORKS as well. Note: Deleted persons cannot be returned as the data was removed from HR WORKS. This parameter will be ignored if persons are specified directly via the persons parameter. | [Optional] [Defaults to `undefined`] |
| **page** | `number` | Set this parameter to access a specific page of results. If the parameter is not set, the first page of results is returned. The API returns paging information via the Link header. The page size for this API call is 50. | [Optional] [Defaults to `1`] |

### Return type

**{ [key: string]: Array<TravelRequestsDateIntervalData>; }**

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

