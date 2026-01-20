
# HealthInsurance


## Properties

Name | Type
------------ | -------------
`careInsuranceBaseRate` | [CurrencyValue](CurrencyValue.md)
`careInsuranceTotalAmount` | [CurrencyValue](CurrencyValue.md)
`healthInsuranceBaseRate` | [CurrencyValue](CurrencyValue.md)
`healthInsuranceTotalAmount` | [CurrencyValue](CurrencyValue.md)
`name` | string
`registrationNumber` | string
`type` | [HealthInsuranceType](HealthInsuranceType.md)

## Example

```typescript
import type { HealthInsurance } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "careInsuranceBaseRate": null,
  "careInsuranceTotalAmount": null,
  "healthInsuranceBaseRate": null,
  "healthInsuranceTotalAmount": null,
  "name": null,
  "registrationNumber": null,
  "type": null,
} satisfies HealthInsurance

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as HealthInsurance
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


