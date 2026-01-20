
# SickLeave


## Properties

Name | Type
------------ | -------------
`type` | string
`beginDate` | Date
`endDate` | Date
`hasElectronicSicknessCertificate` | boolean
`isBeginDateHalfDay` | boolean
`isEndDateHalfDay` | boolean
`name` | string
`number` | string
`status` | string
`statusIdentifier` | [SickLeaveStatus](SickLeaveStatus.md)
`workingDays` | number
`workingDaysInDateInterval` | number
`substitute` | [PersonBaseData](PersonBaseData.md)
`remark` | string
`child` | [SickLeaveChild](SickLeaveChild.md)
`documents` | Array&lt;string&gt;

## Example

```typescript
import type { SickLeave } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "beginDate": null,
  "endDate": null,
  "hasElectronicSicknessCertificate": null,
  "isBeginDateHalfDay": null,
  "isEndDateHalfDay": null,
  "name": null,
  "number": null,
  "status": null,
  "statusIdentifier": null,
  "workingDays": 1.5,
  "workingDaysInDateInterval": 1.5,
  "substitute": null,
  "remark": null,
  "child": null,
  "documents": null,
} satisfies SickLeave

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SickLeave
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


