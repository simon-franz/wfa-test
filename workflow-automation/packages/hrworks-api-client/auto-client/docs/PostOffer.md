
# PostOffer

Representation of a post offer. Used in applicant management endpoints.

## Properties

Name | Type
------------ | -------------
`id` | string
`postOfferNameSuffix` | string
`permanentEstablishments` | [Array&lt;PermanentEstablishment&gt;](PermanentEstablishment.md)
`placeOfWorkType` | string
`placeOfWorkTypeKey` | [PlaceOfWorkTypeKey](PlaceOfWorkTypeKey.md)
`employmentContract` | string
`employmentContractKey` | [EmploymentContractTypeKey](EmploymentContractTypeKey.md)
`careerLevel` | string
`careerLevelKey` | [CareerLevelKey](CareerLevelKey.md)
`description` | string
`displayName` | string
`jobPortal` | string
`priority` | number
`publicationDate` | Date
`validUntilDate` | Date
`workingTimeModel` | string
`workingTimeModelKey` | [WorkingTimeModelKey](WorkingTimeModelKey.md)
`isActive` | boolean

## Example

```typescript
import type { PostOffer } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "postOfferNameSuffix": null,
  "permanentEstablishments": null,
  "placeOfWorkType": null,
  "placeOfWorkTypeKey": null,
  "employmentContract": null,
  "employmentContractKey": null,
  "careerLevel": null,
  "careerLevelKey": null,
  "description": null,
  "displayName": null,
  "jobPortal": null,
  "priority": null,
  "publicationDate": null,
  "validUntilDate": null,
  "workingTimeModel": null,
  "workingTimeModelKey": null,
  "isActive": null,
} satisfies PostOffer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostOffer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


