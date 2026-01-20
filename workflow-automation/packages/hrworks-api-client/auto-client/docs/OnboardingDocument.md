
# OnboardingDocument

Describes onboarding documents that exist in the company.

## Properties

Name | Type
------------ | -------------
`address` | [Address](Address.md)
`bankAccount` | [BankAccount](BankAccount.md)
`birthday` | Date
`birthName` | string
`confession` | [Confession](Confession.md)
`countryOfBirth` | string
`childAllowanceCategory` | string
`emergencyContactDegreeOfKinship` | [EmergencyContactDegreeOfKinship](EmergencyContactDegreeOfKinship.md)
`emergencyContactName` | string
`emergencyContactPhone` | string
`firstName` | string
`gender` | [Gender](Gender.md)
`hasSecondaryEmployment` | boolean
`healthInsuranceType` | [HealthInsuranceType](HealthInsuranceType.md)
`id` | string
`isMainActivity` | boolean
`joinDate` | Date
`languageCode` | string
`lastName` | string
`maritalStatus` | [MaritalStatus](MaritalStatus.md)
`nationality` | string
`noteForOnboardingAdministrator` | string
`noteForOnboardingPerson` | string
`organizationUnit` | [OrganizationUnit](OrganizationUnit.md)
`privateMobilePhoneNumber` | string
`placeOfBirth` | string
`privateEmail` | string
`residencePermitExpiryDate` | Date
`salutation` | string
`superior` | [PersonBaseData](PersonBaseData.md)
`severeDisability` | boolean
`secondaryEmploymentBeginDate` | Date
`socialSecurityNumber` | string
`statusIdentifier` | [OnboardingStatus](OnboardingStatus.md)
`status` | string
`title` | string
`taxCategory` | string
`workPermitExpiryDate` | Date
`organizationUnitUuid` | string

## Example

```typescript
import type { OnboardingDocument } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "bankAccount": null,
  "birthday": null,
  "birthName": null,
  "confession": null,
  "countryOfBirth": null,
  "childAllowanceCategory": null,
  "emergencyContactDegreeOfKinship": null,
  "emergencyContactName": null,
  "emergencyContactPhone": null,
  "firstName": null,
  "gender": null,
  "hasSecondaryEmployment": null,
  "healthInsuranceType": null,
  "id": null,
  "isMainActivity": null,
  "joinDate": null,
  "languageCode": null,
  "lastName": null,
  "maritalStatus": null,
  "nationality": null,
  "noteForOnboardingAdministrator": null,
  "noteForOnboardingPerson": null,
  "organizationUnit": null,
  "privateMobilePhoneNumber": null,
  "placeOfBirth": null,
  "privateEmail": null,
  "residencePermitExpiryDate": null,
  "salutation": null,
  "superior": null,
  "severeDisability": null,
  "secondaryEmploymentBeginDate": null,
  "socialSecurityNumber": null,
  "statusIdentifier": null,
  "status": null,
  "title": null,
  "taxCategory": null,
  "workPermitExpiryDate": null,
  "organizationUnitUuid": null,
} satisfies OnboardingDocument

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OnboardingDocument
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


