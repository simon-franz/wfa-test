
# CostObjectPercentage


## Properties

Name | Type
------------ | -------------
`costCentre` | [CostCenter](CostCenter.md)
`costObjective` | [CostObjective](CostObjective.md)
`mealsPerDiems` | [CurrencyValue](CurrencyValue.md)
`mealsDeductionSum` | [CurrencyValue](CurrencyValue.md)
`lodgingPerDiems` | [CurrencyValue](CurrencyValue.md)
`benefitsInKindSum` | [CurrencyValue](CurrencyValue.md)

## Example

```typescript
import type { CostObjectPercentage } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "costCentre": null,
  "costObjective": null,
  "mealsPerDiems": null,
  "mealsDeductionSum": null,
  "lodgingPerDiems": null,
  "benefitsInKindSum": null,
} satisfies CostObjectPercentage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CostObjectPercentage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


