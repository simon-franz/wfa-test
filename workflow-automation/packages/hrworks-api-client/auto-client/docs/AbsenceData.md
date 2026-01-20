
# AbsenceData

Describes the attributes that can be set while creating/editing absences via the API.

## Properties

Name | Type
------------ | -------------
`type` | string
`beginDate` | Date
`endDate` | Date
`isBeginDateHalfDay` | boolean
`isEndDateHalfDay` | boolean
`status` | [AbsenceStatus](AbsenceStatus.md)
`substitutes` | Array&lt;string&gt;
`remark` | string

## Example

```typescript
import type { AbsenceData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "beginDate": null,
  "endDate": null,
  "isBeginDateHalfDay": null,
  "isEndDateHalfDay": null,
  "status": null,
  "substitutes": null,
  "remark": null,
} satisfies AbsenceData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AbsenceData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


