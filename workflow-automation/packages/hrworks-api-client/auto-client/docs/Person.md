
# Person

Describes a person/employee that exists in HR WORKS. NOTE: If your company has defined additional custom free fields for person master data in HR WORKS, the API will return those as well with the assigned field name as key and the respective values set in the person\'s master data.

## Properties

Name | Type
------------ | -------------
`accountPayable` | string
`address` | [Address](Address.md)
`bankAccount` | [BankAccount](BankAccount.md)
`birthday` | Date
`birthName` | string
`buildingOrRoom` | string
`companyMobilePhoneNumber` | string
`costCenter` | [CostCenter](CostCenter.md)
`costObjective` | [CostObjective](CostObjective.md)
`countryCode` | string
`datevPersonnelNumber` | string
`emergencyContactDegreeOfKinship` | [EmergencyContactDegreeOfKinship](EmergencyContactDegreeOfKinship.md)
`emergencyContactName` | string
`emergencyContactPhone` | string
`email` | string
`employmentType` | [EmploymentType](EmploymentType.md)
`expensesGroup` | [ExpensesGroup](ExpensesGroup.md)
`externalIds` | [Array&lt;ExternalId&gt;](ExternalId.md)
`firstName` | string
`gender` | [Gender](Gender.md)
`historicizedData` | [PersonHistoricizedData](PersonHistoricizedData.md)
`joinDate` | Date
`languageCode` | string
`lastName` | string
`leaveDate` | Date
`nationality` | string
`officePhoneNumber` | string
`organizationUnit` | [OrganizationUnit](OrganizationUnit.md)
`permanentEstablishment` | [PermanentEstablishment](PermanentEstablishment.md)
`shortTimeWorkSchedule` | [ShortTimeWorkSchedule](ShortTimeWorkSchedule.md)
`personId` | string
`personLicenseNumber` | string
`personnelNumber` | string
`position` | string
`privateEmail` | string
`privateMobilePhoneNumber` | string
`probationEndDate` | Date
`salutation` | string
`secondNationality` | string
`superior` | [PersonBaseData](PersonBaseData.md)
`title` | string
`workSchedule` | [WorkSchedule](WorkSchedule.md)
`highestLevelOfEducation` | string
`highestLevelOfEducationId` | [HighestLevelOfEducationId](HighestLevelOfEducationId.md)
`highestProfessionalQualification` | string
`highestProfessionalQualificationId` | [HighestProfessionalQualificationId](HighestProfessionalQualificationId.md)
`socialSecurityNumber` | string
`taxpayerIdentificationNumber` | string
`dateOfNotice` | string
`reasonForGivingNotice` | string
`triggerForGivingNotice` | [TriggerForGivingNotice](TriggerForGivingNotice.md)
`isActive` | boolean
`customNameId` | string
`profilePictureUrl` | string
`timeRecordingRegulation` | [TimeRecordingRegulationBaseData](TimeRecordingRegulationBaseData.md)
`personIdentifierForKiosk` | string
`paymentAccounts` | [Array&lt;PaymentAccount&gt;](PaymentAccount.md)
`uuid` | string
`organizationUnitUuid` | string

## Example

```typescript
import type { Person } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "accountPayable": null,
  "address": null,
  "bankAccount": null,
  "birthday": null,
  "birthName": null,
  "buildingOrRoom": null,
  "companyMobilePhoneNumber": null,
  "costCenter": null,
  "costObjective": null,
  "countryCode": null,
  "datevPersonnelNumber": null,
  "emergencyContactDegreeOfKinship": null,
  "emergencyContactName": null,
  "emergencyContactPhone": null,
  "email": null,
  "employmentType": null,
  "expensesGroup": null,
  "externalIds": null,
  "firstName": null,
  "gender": null,
  "historicizedData": null,
  "joinDate": null,
  "languageCode": null,
  "lastName": null,
  "leaveDate": null,
  "nationality": null,
  "officePhoneNumber": null,
  "organizationUnit": null,
  "permanentEstablishment": null,
  "shortTimeWorkSchedule": null,
  "personId": null,
  "personLicenseNumber": null,
  "personnelNumber": null,
  "position": null,
  "privateEmail": null,
  "privateMobilePhoneNumber": null,
  "probationEndDate": null,
  "salutation": null,
  "secondNationality": null,
  "superior": null,
  "title": null,
  "workSchedule": null,
  "highestLevelOfEducation": null,
  "highestLevelOfEducationId": null,
  "highestProfessionalQualification": null,
  "highestProfessionalQualificationId": null,
  "socialSecurityNumber": null,
  "taxpayerIdentificationNumber": null,
  "dateOfNotice": null,
  "reasonForGivingNotice": null,
  "triggerForGivingNotice": null,
  "isActive": null,
  "customNameId": null,
  "profilePictureUrl": null,
  "timeRecordingRegulation": null,
  "personIdentifierForKiosk": null,
  "paymentAccounts": null,
  "uuid": null,
  "organizationUnitUuid": null,
} satisfies Person

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Person
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


