
# Applicant

The applicant of a job application.

## Properties

Name | Type
------------ | -------------
`address` | [Address](Address.md)
`birthday` | Date
`earliestPossibleJoinDate` | Date
`email` | string
`firstName` | string
`gender` | [Gender](Gender.md)
`uuid` | string
`hasNoticePeriod` | boolean
`isActive` | boolean
`isSeverelyDisabled` | boolean
`jobApplications` | [Array&lt;BaseJobApplication&gt;](BaseJobApplication.md)
`languageCode` | string
`lastAnnualSalary` | [CurrencyValue](CurrencyValue.md)
`lastName` | string
`noticePeriodTimeAmount` | number
`noticePeriodTimeReference` | string
`noticePeriodTimeUnit` | [Interval](Interval.md)
`salutation` | [Salutation](Salutation.md)
`title` | string
`placeOfBirth` | string
`fieldOfStudy` | string

## Example

```typescript
import type { Applicant } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "birthday": null,
  "earliestPossibleJoinDate": null,
  "email": null,
  "firstName": null,
  "gender": null,
  "uuid": null,
  "hasNoticePeriod": null,
  "isActive": null,
  "isSeverelyDisabled": null,
  "jobApplications": null,
  "languageCode": null,
  "lastAnnualSalary": null,
  "lastName": null,
  "noticePeriodTimeAmount": null,
  "noticePeriodTimeReference": null,
  "noticePeriodTimeUnit": null,
  "salutation": null,
  "title": null,
  "placeOfBirth": null,
  "fieldOfStudy": null,
} satisfies Applicant

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Applicant
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


