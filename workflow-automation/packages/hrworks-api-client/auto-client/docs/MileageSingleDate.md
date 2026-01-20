
# MileageSingleDate


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
`date` | Date

## Example

```typescript
import type { MileageSingleDate } from '@hrworks/auto-client'

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
  "date": null,
} satisfies MileageSingleDate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MileageSingleDate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


