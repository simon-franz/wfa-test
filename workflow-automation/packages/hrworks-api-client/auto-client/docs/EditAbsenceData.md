
# EditAbsenceData


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
`number` | string

## Example

```typescript
import type { EditAbsenceData } from '@hrworks/auto-client'

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
  "number": 1_1,
} satisfies EditAbsenceData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EditAbsenceData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


