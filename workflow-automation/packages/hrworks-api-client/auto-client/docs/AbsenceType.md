
# AbsenceType

A type that can be assigned to absences in HR WORKS.

## Properties

Name | Type
------------ | -------------
`name` | string
`key` | string
`isActive` | boolean
`reducesHolidayEntitlement` | boolean
`reducesHolidayEntitlementForFullMonths` | boolean
`reducesTimeAccount` | boolean
`ignoreVacationBlackout` | boolean
`useInMonthPayroll` | boolean
`maxVacationDaysPerYear` | number
`isSubstitutionMandatory` | boolean
`substitutionMandatoryAfterDays` | number
`reducesTargetWorkingHours` | boolean
`color` | string
`isAdminOnly` | boolean
`isPublic` | boolean

## Example

```typescript
import type { AbsenceType } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "key": null,
  "isActive": null,
  "reducesHolidayEntitlement": null,
  "reducesHolidayEntitlementForFullMonths": null,
  "reducesTimeAccount": null,
  "ignoreVacationBlackout": null,
  "useInMonthPayroll": null,
  "maxVacationDaysPerYear": null,
  "isSubstitutionMandatory": null,
  "substitutionMandatoryAfterDays": null,
  "reducesTargetWorkingHours": null,
  "color": null,
  "isAdminOnly": null,
  "isPublic": null,
} satisfies AbsenceType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbsenceType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


