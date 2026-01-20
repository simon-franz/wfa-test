
# VacationType

A vacation type in HR WORKS.

## Properties

Name | Type
------------ | -------------
`name` | string
`key` | string
`countryCode` | string
`isActive` | boolean
`isAssigned` | boolean
`isDefault` | boolean
`weeklyWorkingHours` | number
`minimumVacationEntitlement` | number
`additionalVacationEntitlement` | number
`disabilityRelatedVacationEntitlement` | number
`vacationCalculationLeaveSecondHalf` | [ProportionalVacationEntitlementCalculation](ProportionalVacationEntitlementCalculation.md)
`vacationCalculationEntryFirstHalf` | [ProportionalVacationEntitlementCalculation](ProportionalVacationEntitlementCalculation.md)
`expirationDays` | number
`expirationMonths` | number
`ageRelatedVacationEntitlement` | [Array&lt;ValueAssociatedNumericalRange&gt;](ValueAssociatedNumericalRange.md)
`tenureRelatedVacationEntitlement` | [Array&lt;ValueAssociatedNumericalRange&gt;](ValueAssociatedNumericalRange.md)

## Example

```typescript
import type { VacationType } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "key": null,
  "countryCode": null,
  "isActive": null,
  "isAssigned": null,
  "isDefault": null,
  "weeklyWorkingHours": null,
  "minimumVacationEntitlement": null,
  "additionalVacationEntitlement": null,
  "disabilityRelatedVacationEntitlement": null,
  "vacationCalculationLeaveSecondHalf": null,
  "vacationCalculationEntryFirstHalf": null,
  "expirationDays": null,
  "expirationMonths": null,
  "ageRelatedVacationEntitlement": null,
  "tenureRelatedVacationEntitlement": null,
} satisfies VacationType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VacationType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


