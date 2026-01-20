
# SickLeaveData

Describes the attributes that can be set while creating/editing sick leaves via the API.

## Properties

Name | Type
------------ | -------------
`type` | string
`beginDate` | Date
`endDate` | Date
`hasElectronicSicknessCertificate` | boolean
`isBeginDateHalfDay` | boolean
`isEndDateHalfDay` | boolean
`status` | [SickLeaveStatus](SickLeaveStatus.md)
`personnelNumber` | string
`substitute` | string

## Example

```typescript
import type { SickLeaveData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "beginDate": null,
  "endDate": null,
  "hasElectronicSicknessCertificate": null,
  "isBeginDateHalfDay": null,
  "isEndDateHalfDay": null,
  "status": null,
  "personnelNumber": null,
  "substitute": null,
} satisfies SickLeaveData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SickLeaveData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


