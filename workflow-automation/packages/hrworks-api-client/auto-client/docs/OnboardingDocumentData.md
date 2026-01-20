
# OnboardingDocumentData

Input data for creating a new onboarding document.

## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`organizationUnitNumber` | string
`privateEmail` | string
`joinDate` | Date
`address` | [Address](Address.md)
`bankAccount` | [BankAccount](BankAccount.md)
`birthday` | Date
`nationality` | string
`gender` | [Gender](Gender.md)
`workPermitExpiryDate` | Date
`residencePermitExpiryDate` | Date
`maritalStatus` | [MaritalStatus](MaritalStatus.md)
`emergencyContactDegreeOfKinship` | [EmergencyContactDegreeOfKinship](EmergencyContactDegreeOfKinship.md)
`emergencyContactName` | string
`emergencyContactPhone` | string
`salutation` | string
`birthName` | string
`countryOfBirth` | string
`title` | string
`languageCode` | string
`privateMobilePhoneNumber` | string
`placeOfBirth` | string
`noteForOnboardingAdministrator` | string
`noteForOnboardingPerson` | string
`healthInsuranceType` | [HealthInsuranceType](HealthInsuranceType.md)
`confession` | [Confession](Confession.md)
`socialSecurityNumber` | string
`isMainActivity` | boolean
`hasSecondaryEmployment` | boolean
`secondaryEmploymentBeginDate` | string
`taxCategory` | string
`childAllowanceCategory` | string

## Example

```typescript
import type { OnboardingDocumentData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "firstName": null,
  "lastName": null,
  "organizationUnitNumber": null,
  "privateEmail": null,
  "joinDate": null,
  "address": null,
  "bankAccount": null,
  "birthday": null,
  "nationality": null,
  "gender": null,
  "workPermitExpiryDate": null,
  "residencePermitExpiryDate": null,
  "maritalStatus": null,
  "emergencyContactDegreeOfKinship": null,
  "emergencyContactName": null,
  "emergencyContactPhone": null,
  "salutation": null,
  "birthName": null,
  "countryOfBirth": null,
  "title": null,
  "languageCode": null,
  "privateMobilePhoneNumber": null,
  "placeOfBirth": null,
  "noteForOnboardingAdministrator": null,
  "noteForOnboardingPerson": null,
  "healthInsuranceType": null,
  "confession": null,
  "socialSecurityNumber": null,
  "isMainActivity": null,
  "hasSecondaryEmployment": null,
  "secondaryEmploymentBeginDate": null,
  "taxCategory": null,
  "childAllowanceCategory": null,
} satisfies OnboardingDocumentData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OnboardingDocumentData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


