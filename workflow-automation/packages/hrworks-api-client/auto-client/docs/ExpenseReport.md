
# ExpenseReport


## Properties

Name | Type
------------ | -------------
`advancesSum` | [CurrencyValue](CurrencyValue.md)
`beginDate` | Date
`beginTime` | string
`costCenter` | [CostCenter](CostCenter.md)
`costObjective` | [CostObjective](CostObjective.md)
`days` | [Array&lt;ExpenseReportDay&gt;](ExpenseReportDay.md)
`defaultPaymentType` | string
`destination` | string
`receiptDocuments` | Array&lt;string&gt;
`endDate` | Date
`endTime` | string
`isExpenseReport` | boolean
`lodgingPerDiemsSum` | [CurrencyValue](CurrencyValue.md)
`mealsDeductionSum` | [CurrencyValue](CurrencyValue.md)
`mealsPerDiemsSum` | [CurrencyValue](CurrencyValue.md)
`mileages` | [Array&lt;ExpenseReportMileagesInner&gt;](ExpenseReportMileagesInner.md)
`name` | string
`number` | string
`overnightStayAfterFirstDay` | boolean
`paymentSum` | [CurrencyValue](CurrencyValue.md)
`person` | [PersonBaseData](PersonBaseData.md)
`receipts` | [Array&lt;Receipt&gt;](Receipt.md)
`receiptSum` | [CurrencyValue](CurrencyValue.md)
`reducedPaymentValueSum` | [CurrencyValue](CurrencyValue.md)
`reference` | number
`startLocation` | string
`status` | string
`statusIdentifier` | [ExpenseReportStatus](ExpenseReportStatus.md)
`stopovers` | string
`threeMonthsRuleActive` | boolean
`totalSum` | [CurrencyValue](CurrencyValue.md)
`clientRelatedTrip` | boolean
`orderNumberDatevEO` | string
`borderCrossings` | [Array&lt;BorderCrossing&gt;](BorderCrossing.md)

## Example

```typescript
import type { ExpenseReport } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "advancesSum": null,
  "beginDate": null,
  "beginTime": null,
  "costCenter": null,
  "costObjective": null,
  "days": null,
  "defaultPaymentType": null,
  "destination": null,
  "receiptDocuments": null,
  "endDate": null,
  "endTime": null,
  "isExpenseReport": null,
  "lodgingPerDiemsSum": null,
  "mealsDeductionSum": null,
  "mealsPerDiemsSum": null,
  "mileages": null,
  "name": null,
  "number": null,
  "overnightStayAfterFirstDay": null,
  "paymentSum": null,
  "person": null,
  "receipts": null,
  "receiptSum": null,
  "reducedPaymentValueSum": null,
  "reference": null,
  "startLocation": null,
  "status": null,
  "statusIdentifier": null,
  "stopovers": null,
  "threeMonthsRuleActive": null,
  "totalSum": null,
  "clientRelatedTrip": null,
  "orderNumberDatevEO": null,
  "borderCrossings": null,
} satisfies ExpenseReport

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExpenseReport
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


