
# MileageMultiDate


## Properties

Name | Type
------------ | -------------
`costCenter` | [CostCenter](CostCenter.md)
`costObjective` | [CostObjective](CostObjective.md)
`description` | string
`destination` | string
`distance` | [UnitValueTuple](UnitValueTuple.md)
`flatRate` | [MileageFlatRate](MileageFlatRate.md)
`startLocation` | string
`vehicle` | [Vehicle](Vehicle.md)
`arrivalDate` | Date
`arrivalTime` | string
`departureDate` | Date
`departureTime` | string

## Example

```typescript
import type { MileageMultiDate } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "costCenter": null,
  "costObjective": null,
  "description": null,
  "destination": null,
  "distance": null,
  "flatRate": null,
  "startLocation": null,
  "vehicle": null,
  "arrivalDate": null,
  "arrivalTime": null,
  "departureDate": null,
  "departureTime": null,
} satisfies MileageMultiDate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MileageMultiDate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


