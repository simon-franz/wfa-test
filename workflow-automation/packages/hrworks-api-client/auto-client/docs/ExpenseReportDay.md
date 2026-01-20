
# ExpenseReportDay


## Properties

Name | Type
------------ | -------------
`breakfastDeduction` | [CurrencyValue](CurrencyValue.md)
`date` | Date
`dinnerDeduction` | [CurrencyValue](CurrencyValue.md)
`lodgingPerDiems` | [CurrencyValue](CurrencyValue.md)
`lunchDeduction` | [CurrencyValue](CurrencyValue.md)
`mealsDeductionSum` | [CurrencyValue](CurrencyValue.md)
`mealsPerDiems` | [CurrencyValue](CurrencyValue.md)
`countryCode` | string
`overnightStayCountryCode` | string
`paymentSum` | [CurrencyValue](CurrencyValue.md)
`percentageAllocation` | [Array&lt;CostObjectPercentage&gt;](CostObjectPercentage.md)
`benefitsInKindSum` | [CurrencyValue](CurrencyValue.md)

## Example

```typescript
import type { ExpenseReportDay } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "breakfastDeduction": null,
  "date": null,
  "dinnerDeduction": null,
  "lodgingPerDiems": null,
  "lunchDeduction": null,
  "mealsDeductionSum": null,
  "mealsPerDiems": null,
  "countryCode": null,
  "overnightStayCountryCode": null,
  "paymentSum": null,
  "percentageAllocation": null,
  "benefitsInKindSum": null,
} satisfies ExpenseReportDay

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExpenseReportDay
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


