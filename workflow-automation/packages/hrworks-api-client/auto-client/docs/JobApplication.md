
# JobApplication


## Properties

Name | Type
------------ | -------------
`id` | string
`statusIdentifier` | [JobApplicationStatus](JobApplicationStatus.md)
`postUuid` | string
`applicant` | [Applicant](Applicant.md)
`applicationDocuments` | Array&lt;string&gt;
`creationDateAndTime` | Date
`desiredSalary` | string
`howDidYouHearAboutUs` | string
`ipAddress` | string
`mayBePassedWithinCorporateGroup` | boolean
`permissionToStoreApplication` | [PermissionToStoreApplication](PermissionToStoreApplication.md)
`postId` | string
`postOfferId` | string
`remark` | string
`status` | string
`userAgent` | string
`hasPrivacyTermsAccepted` | boolean

## Example

```typescript
import type { JobApplication } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "statusIdentifier": null,
  "postUuid": null,
  "applicant": null,
  "applicationDocuments": null,
  "creationDateAndTime": null,
  "desiredSalary": null,
  "howDidYouHearAboutUs": null,
  "ipAddress": null,
  "mayBePassedWithinCorporateGroup": null,
  "permissionToStoreApplication": null,
  "postId": null,
  "postOfferId": null,
  "remark": null,
  "status": null,
  "userAgent": null,
  "hasPrivacyTermsAccepted": null,
} satisfies JobApplication

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobApplication
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


