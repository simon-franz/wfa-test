
# PersonHistoricizedHealthInsuranceData


## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`data` | [HealthInsurance](HealthInsurance.md)

## Example

```typescript
import type { PersonHistoricizedHealthInsuranceData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "data": null,
} satisfies PersonHistoricizedHealthInsuranceData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonHistoricizedHealthInsuranceData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


