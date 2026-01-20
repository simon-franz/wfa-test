# GeneralApi

All URIs are relative to *https://api.hrworks.de*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createHolidays**](GeneralApi.md#createholidays) | **POST** /v2/holidays | POST Holidays |
| [**createOrganizationUnits**](GeneralApi.md#createorganizationunits) | **POST** /v2/organization-units | POST Organization Units |
| [**createPermanentEstablishments**](GeneralApi.md#createpermanentestablishments) | **POST** /v2/permanent-establishments | POST Permanent Establishments |
| [**editPermanentEstablishments**](GeneralApi.md#editpermanentestablishmentsoperation) | **PUT** /v2/permanent-establishments | PUT Permanent Establishments |
| [**getEditHolidaysStatus**](GeneralApi.md#geteditholidaysstatus) | **GET** /v2/holidays/jobs/{jobId} | GET Holidays Jobs |
| [**getEditOrganizationUnitStatus**](GeneralApi.md#geteditorganizationunitstatus) | **GET** /v2/organization-units/jobs/{jobId} | GET Organization Units Jobs |
| [**getOrganizationUnit**](GeneralApi.md#getorganizationunit) | **GET** /v2/organization-units/{uuid} | GET Single Organization Unit |
| [**getPermanentEstablishment**](GeneralApi.md#getpermanentestablishment) | **GET** /v2/permanent-establishments/{id} | GET Single Permanent Establishment |
| [**getPermanentEstablishmentCreationStatus**](GeneralApi.md#getpermanentestablishmentcreationstatus) | **GET** /v2/permanent-establishments/jobs/{jobId} | GET Permanent Establishments Jobs |
| [**listHolidays**](GeneralApi.md#listholidays) | **GET** /v2/holidays | GET Holidays |
| [**listOrganizationUnits**](GeneralApi.md#listorganizationunits) | **GET** /v2/organization-units | GET Organization Units |
| [**listPermanentEstablishments**](GeneralApi.md#listpermanentestablishments) | **GET** /v2/permanent-establishments | GET Permanent Establishments |
| [**listPresentPersonsOfOrganizationUnit**](GeneralApi.md#listpresentpersonsoforganizationunit) | **GET** /v2/organization-units/{number}/present-persons | GET Present Persons |



## createHolidays

> JobIdObject createHolidays(editHolidaysRequest)

POST Holidays

Create new company holidays in HR WORKS. Holidays can be created at different levels: For a whole country, for a specific state of a country or for a specific company permanent establishment. This is represented by the permanentEstablishmentId, state and countryCode properties. When creating holidays via POST, at least one of those attributes has to be set. In order to create a state-level holiday, both state and countyCode have to be set.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { CreateHolidaysRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // EditHolidaysRequest | Collection of holiday data.
    editHolidaysRequest: ...,
  } satisfies CreateHolidaysRequest;

  try {
    const data = await api.createHolidays(body);
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
| **editHolidaysRequest** | [EditHolidaysRequest](EditHolidaysRequest.md) | Collection of holiday data. | |

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


## createOrganizationUnits

> JobIdObject createOrganizationUnits(editOrganizationUnitsRequest)

POST Organization Units

Create organization units in HR WORKS. Parent and child organization units can be created using the same API call.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { CreateOrganizationUnitsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // EditOrganizationUnitsRequest | Collection of organization unit data.
    editOrganizationUnitsRequest: ...,
  } satisfies CreateOrganizationUnitsRequest;

  try {
    const data = await api.createOrganizationUnits(body);
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
| **editOrganizationUnitsRequest** | [EditOrganizationUnitsRequest](EditOrganizationUnitsRequest.md) | Collection of organization unit data. | |

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


## createPermanentEstablishments

> JobIdObject createPermanentEstablishments(editPermanentEstablishmentsRequest)

POST Permanent Establishments

Create new permanent establishments in HR WORKS.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { CreatePermanentEstablishmentsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // EditPermanentEstablishmentsRequest | Collection of permanent establishment data.
    editPermanentEstablishmentsRequest: ...,
  } satisfies CreatePermanentEstablishmentsRequest;

  try {
    const data = await api.createPermanentEstablishments(body);
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
| **editPermanentEstablishmentsRequest** | [EditPermanentEstablishmentsRequest](EditPermanentEstablishmentsRequest.md) | Collection of permanent establishment data. | |

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


## editPermanentEstablishments

> JobIdObject editPermanentEstablishments(editPermanentEstablishmentsRequest)

PUT Permanent Establishments

Edit permanent establishments in HR WORKS.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { EditPermanentEstablishmentsOperationRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // EditPermanentEstablishmentsRequest | Collection of permanent establishment data.
    editPermanentEstablishmentsRequest: ...,
  } satisfies EditPermanentEstablishmentsOperationRequest;

  try {
    const data = await api.editPermanentEstablishments(body);
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
| **editPermanentEstablishmentsRequest** | [EditPermanentEstablishmentsRequest](EditPermanentEstablishmentsRequest.md) | Collection of permanent establishment data. | |

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


## getEditHolidaysStatus

> MultiWriteRequestResponse getEditHolidaysStatus(jobId)

GET Holidays Jobs

After a POST or PUT request to the /holidays endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { GetEditHolidaysStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // string | The job id of the previous write request.
    jobId: jobId_example,
  } satisfies GetEditHolidaysStatusRequest;

  try {
    const data = await api.getEditHolidaysStatus(body);
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


## getEditOrganizationUnitStatus

> MultiWriteRequestResponse getEditOrganizationUnitStatus(jobId)

GET Organization Units Jobs

After a POST or PUT request to the /organization-units endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { GetEditOrganizationUnitStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // string | The job id.
    jobId: jobId_example,
  } satisfies GetEditOrganizationUnitStatusRequest;

  try {
    const data = await api.getEditOrganizationUnitStatus(body);
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
| **jobId** | `string` | The job id. | [Defaults to `undefined`] |

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


## getOrganizationUnit

> OrganizationUnit getOrganizationUnit(uuid)

GET Single Organization Unit

Return the data of a specific organization unit of the company.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { GetOrganizationUnitRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // string | The uuid or number of the organization unit in HR WORKS. The unique identifier cannot be changed. The passing of the number is deprecated.
    uuid: uuid_example,
  } satisfies GetOrganizationUnitRequest;

  try {
    const data = await api.getOrganizationUnit(body);
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
| **uuid** | `string` | The uuid or number of the organization unit in HR WORKS. The unique identifier cannot be changed. The passing of the number is deprecated. | [Defaults to `undefined`] |

### Return type

[**OrganizationUnit**](OrganizationUnit.md)

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


## getPermanentEstablishment

> PermanentEstablishment getPermanentEstablishment(id)

GET Single Permanent Establishment

Return the data of a specific permanent establishment of the company.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { GetPermanentEstablishmentRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // string | The id of the permanent establishment.
    id: id_example,
  } satisfies GetPermanentEstablishmentRequest;

  try {
    const data = await api.getPermanentEstablishment(body);
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
| **id** | `string` | The id of the permanent establishment. | [Defaults to `undefined`] |

### Return type

[**PermanentEstablishment**](PermanentEstablishment.md)

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


## getPermanentEstablishmentCreationStatus

> MultiWriteRequestResponse getPermanentEstablishmentCreationStatus(jobId)

GET Permanent Establishments Jobs

After a POST or PUT request to the /permanent-establishments endpoint was performed, the result can be fetched via the corresponding /jobs endpoint.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { GetPermanentEstablishmentCreationStatusRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // string | The job id.
    jobId: jobId_example,
  } satisfies GetPermanentEstablishmentCreationStatusRequest;

  try {
    const data = await api.getPermanentEstablishmentCreationStatus(body);
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
| **jobId** | `string` | The job id. | [Defaults to `undefined`] |

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


## listHolidays

> { [key: string]: HolidaysByCountryWrapper; } listHolidays(year, countryCodes, permanentEstablishments)

GET Holidays

Lists the holidays for the company and its permanent establishments for the specified year and country.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { ListHolidaysRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // number | The year for which the holidays will be returned.
    year: 8.14,
    // Array<string> | A collection of ISO 3166-1 alpha-3 country codes (e.g. DEU, IRL, USA) for which to return data. If not specified, data for all countries in your HR WORKS company account will be returned. Country codes for which no corresponding conutry was found in the HR WORKS company account will be omitted. (optional)
    countryCodes: ...,
    // Array<string> | A collection of permanent establishment IDs. If specified, only holidays for the given permanent establishments will be returned. (But still including all general holidays for the specified country code(s)). Else, all holidays which otherwise match the parameters are returned. (optional)
    permanentEstablishments: ...,
  } satisfies ListHolidaysRequest;

  try {
    const data = await api.listHolidays(body);
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
| **year** | `number` | The year for which the holidays will be returned. | [Defaults to `undefined`] |
| **countryCodes** | `Array<string>` | A collection of ISO 3166-1 alpha-3 country codes (e.g. DEU, IRL, USA) for which to return data. If not specified, data for all countries in your HR WORKS company account will be returned. Country codes for which no corresponding conutry was found in the HR WORKS company account will be omitted. | [Optional] |
| **permanentEstablishments** | `Array<string>` | A collection of permanent establishment IDs. If specified, only holidays for the given permanent establishments will be returned. (But still including all general holidays for the specified country code(s)). Else, all holidays which otherwise match the parameters are returned. | [Optional] |

### Return type

[**{ [key: string]: HolidaysByCountryWrapper; }**](HolidaysByCountryWrapper.md)

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


## listOrganizationUnits

> ListOrganizationUnitsReponse listOrganizationUnits()

GET Organization Units

Lists all organization units of the company with ID/number and name. Only active organization units will be returned.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { ListOrganizationUnitsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  try {
    const data = await api.listOrganizationUnits();
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

[**ListOrganizationUnitsReponse**](ListOrganizationUnitsReponse.md)

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


## listPermanentEstablishments

> ListPermanentEstablishmentsResponse listPermanentEstablishments()

GET Permanent Establishments

Lists all permanent establishments of the company with ID/number and name. Only active permanent establishments will be returned.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { ListPermanentEstablishmentsRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  try {
    const data = await api.listPermanentEstablishments();
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

[**ListPermanentEstablishmentsResponse**](ListPermanentEstablishmentsResponse.md)

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


## listPresentPersonsOfOrganizationUnit

> ListPresentPersonsOfOrganizationUnitResponse listPresentPersonsOfOrganizationUnit(number)

GET Present Persons

Lists all persons that are currently \&quot;in the office\&quot;. This action does account for vacations, trips, sicknesses and other absences by forenoon and afternoon. A half-day absence is considered to last from 12 pm to 11:59 am, which counts as \&quot;forenoon\&quot;, likewise, an \&quot;afternoon\&quot; absence is considered to last from 12 am to 11:59 pm.

### Example

```ts
import {
  Configuration,
  GeneralApi,
} from '@hrworks/auto-client';
import type { ListPresentPersonsOfOrganizationUnitRequest } from '@hrworks/auto-client';

async function example() {
  console.log("🚀 Testing @hrworks/auto-client SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerJWT
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new GeneralApi(config);

  const body = {
    // string | ID of the organization unit to return data for.
    number: number_example,
  } satisfies ListPresentPersonsOfOrganizationUnitRequest;

  try {
    const data = await api.listPresentPersonsOfOrganizationUnit(body);
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
| **number** | `string` | ID of the organization unit to return data for. | [Defaults to `undefined`] |

### Return type

[**ListPresentPersonsOfOrganizationUnitResponse**](ListPresentPersonsOfOrganizationUnitResponse.md)

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

