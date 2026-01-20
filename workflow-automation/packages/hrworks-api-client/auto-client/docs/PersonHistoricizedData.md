
# PersonHistoricizedData

Describes data that is assigned to a person for a period of time.

## Properties

Name | Type
------------ | -------------
`address` | [Array&lt;PersonHistoricizedAddressData&gt;](PersonHistoricizedAddressData.md)
`bankAccount` | [Array&lt;PersonHistoricizedBankAccountData&gt;](PersonHistoricizedBankAccountData.md)
`healthInsurance` | [Array&lt;PersonHistoricizedHealthInsuranceData&gt;](PersonHistoricizedHealthInsuranceData.md)
`employment` | [Array&lt;PersonHistoricizedEmploymentData&gt;](PersonHistoricizedEmploymentData.md)
`severeDisability` | [Array&lt;PersonHistoricizedSevereDisabilityData&gt;](PersonHistoricizedSevereDisabilityData.md)
`shortTimeWorkSchedule` | [Array&lt;PersonHistoricizedShortTimeWorkScheduleData&gt;](PersonHistoricizedShortTimeWorkScheduleData.md)
`workSchedule` | [Array&lt;PersonHistoricizedWorkScheduleData&gt;](PersonHistoricizedWorkScheduleData.md)

## Example

```typescript
import type { PersonHistoricizedData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "bankAccount": null,
  "healthInsurance": null,
  "employment": null,
  "severeDisability": null,
  "shortTimeWorkSchedule": null,
  "workSchedule": null,
} satisfies PersonHistoricizedData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonHistoricizedData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


