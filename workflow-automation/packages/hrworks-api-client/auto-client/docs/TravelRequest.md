
# TravelRequest


## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`costCenter` | [CostCenter](CostCenter.md)
`costObjective` | [CostObjective](CostObjective.md)
`destination` | string
`person` | [PersonBaseData](PersonBaseData.md)
`name` | string
`number` | string
`startLocation` | string
`status` | string
`statusIdentifier` | [TravelRequestStatus](TravelRequestStatus.md)
`stopovers` | string
`expectedCosts` | [CurrencyValue](CurrencyValue.md)
`destinationCountries` | string
`travelExpensesReportNumber` | string

## Example

```typescript
import type { TravelRequest } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "costCenter": null,
  "costObjective": null,
  "destination": null,
  "person": null,
  "name": null,
  "number": null,
  "startLocation": null,
  "status": null,
  "statusIdentifier": null,
  "stopovers": null,
  "expectedCosts": null,
  "destinationCountries": null,
  "travelExpensesReportNumber": null,
} satisfies TravelRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TravelRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


