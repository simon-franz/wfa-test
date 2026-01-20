
# Receipt


## Properties

Name | Type
------------ | -------------
`description` | string
`vatPercentage` | string
`totalSum` | [CurrencyValue](CurrencyValue.md)
`baseCurrencyTotalSum` | [CurrencyValue](CurrencyValue.md)
`netSum` | [CurrencyValue](CurrencyValue.md)
`baseCurrencyNetSum` | [CurrencyValue](CurrencyValue.md)
`costCenter` | [CostCenter](CostCenter.md)
`costObjective` | [CostObjective](CostObjective.md)
`type` | string
`receiptDocument` | string
`paymentType` | string
`number` | string
`isSelfIssuedReceipt` | boolean
`date` | Date
`persons` | string
`externalPersons` | Array&lt;string&gt;
`internalPersons` | [Array&lt;PersonBaseData&gt;](PersonBaseData.md)
`reason` | string
`tipGrossAmount` | [CurrencyValue](CurrencyValue.md)
`tipVatPercentage` | string
`drinksGrossAmount` | [CurrencyValue](CurrencyValue.md)
`drinksVatPercentage` | string
`breakfastGrossAmount` | [CurrencyValue](CurrencyValue.md)
`breakfastVatPercentage` | string
`breakfastIncluded` | boolean
`ancillaryServicesGrossAmount` | [CurrencyValue](CurrencyValue.md)
`ancillaryServicesVatPercentage` | string
`exchangeRate` | number

## Example

```typescript
import type { Receipt } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "vatPercentage": null,
  "totalSum": null,
  "baseCurrencyTotalSum": null,
  "netSum": null,
  "baseCurrencyNetSum": null,
  "costCenter": null,
  "costObjective": null,
  "type": null,
  "receiptDocument": null,
  "paymentType": null,
  "number": null,
  "isSelfIssuedReceipt": null,
  "date": null,
  "persons": null,
  "externalPersons": null,
  "internalPersons": null,
  "reason": null,
  "tipGrossAmount": null,
  "tipVatPercentage": null,
  "drinksGrossAmount": null,
  "drinksVatPercentage": null,
  "breakfastGrossAmount": null,
  "breakfastVatPercentage": null,
  "breakfastIncluded": null,
  "ancillaryServicesGrossAmount": null,
  "ancillaryServicesVatPercentage": null,
  "exchangeRate": null,
} satisfies Receipt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Receipt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


