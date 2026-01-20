
# JobApplicationData


## Properties

Name | Type
------------ | -------------
`postId` | string
`postOfferId` | string
`salutation` | [Salutation](Salutation.md)
`title` | string
`firstName` | string
`lastName` | string
`gender` | [Gender](Gender.md)
`email` | string
`phone` | string
`street` | string
`streetNumber` | string
`additional` | string
`zipCode` | string
`city` | string
`countryCode` | string
`birthday` | Date
`lastAnnualSalary` | [CurrencyValue](CurrencyValue.md)
`desiredSalary` | number
`earliestPossibleJoinDate` | Date
`hasNoticePeriod` | boolean
`hasPrivacyTermsAccepted` | boolean
`noticePeriodTimeAmount` | number
`noticePeriodTimeUnit` | [Interval](Interval.md)
`noticePeriodTimeReference` | [TimeReference](TimeReference.md)
`isSeverelyDisabled` | boolean
`howDidYouHearAboutUs` | string
`remark` | string
`permissionToStoreApplication` | [PermissionToStoreApplication](PermissionToStoreApplication.md)
`mayBePassedWithinCorporateGroup` | boolean
`ipAddress` | string
`userAgent` | string
`creationDateAndTime` | Date
`placeOfBirth` | string
`fieldOfStudy` | string

## Example

```typescript
import type { JobApplicationData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "postId": null,
  "postOfferId": null,
  "salutation": null,
  "title": null,
  "firstName": null,
  "lastName": null,
  "gender": null,
  "email": null,
  "phone": null,
  "street": null,
  "streetNumber": null,
  "additional": null,
  "zipCode": null,
  "city": null,
  "countryCode": null,
  "birthday": null,
  "lastAnnualSalary": null,
  "desiredSalary": null,
  "earliestPossibleJoinDate": null,
  "hasNoticePeriod": null,
  "hasPrivacyTermsAccepted": null,
  "noticePeriodTimeAmount": null,
  "noticePeriodTimeUnit": null,
  "noticePeriodTimeReference": null,
  "isSeverelyDisabled": null,
  "howDidYouHearAboutUs": null,
  "remark": null,
  "permissionToStoreApplication": null,
  "mayBePassedWithinCorporateGroup": null,
  "ipAddress": null,
  "userAgent": null,
  "creationDateAndTime": null,
  "placeOfBirth": null,
  "fieldOfStudy": null,
} satisfies JobApplicationData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobApplicationData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


