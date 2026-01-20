
# HolidaysByCountryWrapper


## Properties

Name | Type
------------ | -------------
`permanentEstablishmentHolidays` | { [key: string]: Array&lt;Holiday&gt;; }
`stateHolidays` | { [key: string]: Array&lt;Holiday&gt;; }
`generalHolidays` | [Array&lt;Holiday&gt;](Holiday.md)

## Example

```typescript
import type { HolidaysByCountryWrapper } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "permanentEstablishmentHolidays": null,
  "stateHolidays": null,
  "generalHolidays": null,
} satisfies HolidaysByCountryWrapper

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HolidaysByCountryWrapper
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


