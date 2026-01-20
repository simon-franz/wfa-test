
# PersonData

Describes the attributes that can be set while creating/editing persons via the API.

## Properties

Name | Type
------------ | -------------
`accountPayable` | string
`address` | [Address](Address.md)
`bankAccount` | [BankAccount](BankAccount.md)
`birthday` | Date
`buildingOrRoom` | string
`companyMobilePhoneNumber` | string
`costCenterNumber` | string
`costObjectiveNumber` | string
`countryCode` | string
`customNameId` | string
`datevPersonnelNumber` | string
`email` | string
`employmentType` | [EmploymentType](EmploymentType.md)
`firstName` | string
`gender` | [Gender](Gender.md)
`joinDate` | Date
`lastName` | string
`leaveDate` | Date
`nationality` | string
`officePhoneNumber` | string
`organizationUnitNumber` | string
`permanentEstablishmentId` | string
`personId` | string
`personnelNumber` | string
`position` | string
`probationEndDate` | Date
`secondNationality` | string
`superiorPersonnelNumber` | string
`title` | string
`workScheduleBeginDate` | Date
`workScheduleId` | string
`highestLevelOfEducation` | string
`highestLevelOfEducationId` | [HighestLevelOfEducationId](HighestLevelOfEducationId.md)
`highestProfessionalQualification` | string
`highestProfessionalQualificationId` | [HighestProfessionalQualificationId](HighestProfessionalQualificationId.md)
`socialSecurityNumber` | string
`taxpayerIdentificationNumber` | string
`personIdentifierForKiosk` | string
`timeRecordingRegulationKey` | string

## Example

```typescript
import type { PersonData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "accountPayable": null,
  "address": null,
  "bankAccount": null,
  "birthday": null,
  "buildingOrRoom": null,
  "companyMobilePhoneNumber": null,
  "costCenterNumber": null,
  "costObjectiveNumber": null,
  "countryCode": null,
  "customNameId": null,
  "datevPersonnelNumber": null,
  "email": null,
  "employmentType": null,
  "firstName": null,
  "gender": null,
  "joinDate": null,
  "lastName": null,
  "leaveDate": null,
  "nationality": null,
  "officePhoneNumber": null,
  "organizationUnitNumber": null,
  "permanentEstablishmentId": null,
  "personId": null,
  "personnelNumber": null,
  "position": null,
  "probationEndDate": null,
  "secondNationality": null,
  "superiorPersonnelNumber": null,
  "title": null,
  "workScheduleBeginDate": null,
  "workScheduleId": null,
  "highestLevelOfEducation": null,
  "highestLevelOfEducationId": null,
  "highestProfessionalQualification": null,
  "highestProfessionalQualificationId": null,
  "socialSecurityNumber": null,
  "taxpayerIdentificationNumber": null,
  "personIdentifierForKiosk": null,
  "timeRecordingRegulationKey": null,
} satisfies PersonData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


