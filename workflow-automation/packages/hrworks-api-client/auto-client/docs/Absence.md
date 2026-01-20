
# Absence


## Properties

Name | Type
------------ | -------------
`type` | string
`beginDate` | Date
`endDate` | Date
`isBeginDateHalfDay` | boolean
`isEndDateHalfDay` | boolean
`name` | string
`number` | string
`status` | string
`statusIdentifier` | [AbsenceStatus](AbsenceStatus.md)
`workingDays` | number
`workingDaysInDateInterval` | number
`remark` | string
`substitutes` | [Array&lt;PersonBaseData&gt;](PersonBaseData.md)

## Example

```typescript
import type { Absence } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "beginDate": null,
  "endDate": null,
  "isBeginDateHalfDay": null,
  "isEndDateHalfDay": null,
  "name": null,
  "number": null,
  "status": null,
  "statusIdentifier": null,
  "workingDays": 1.5,
  "workingDaysInDateInterval": 1.5,
  "remark": null,
  "substitutes": null,
} satisfies Absence

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Absence
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


