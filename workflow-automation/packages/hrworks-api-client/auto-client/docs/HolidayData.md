
# HolidayData

Input data to create holidays in HR WORKS. Holidays can be created at different levels: For a whole country, for a specific state of a country or for a specific company permanent establishment. This is represented by the permanentEstablishmentId, state and countryCode properties. When creating holidays via POST, at least one of those attributes has to be set. In order to create a state-level holiday, both state and countyCode have to be set.

## Properties

Name | Type
------------ | -------------
`date` | Date
`isHalfDay` | boolean
`name` | string
`permanentEstablishmentId` | string
`state` | string
`countryCode` | string

## Example

```typescript
import type { HolidayData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "date": null,
  "isHalfDay": null,
  "name": null,
  "permanentEstablishmentId": null,
  "state": null,
  "countryCode": null,
} satisfies HolidayData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HolidayData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


