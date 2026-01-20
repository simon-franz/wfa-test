
# RemoteWork


## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`isBeginDateHalfDay` | boolean
`isEndDateHalfDay` | boolean
`number` | string
`status` | string
`statusIdentifier` | [RemoteWorkStatus](RemoteWorkStatus.md)
`workingDays` | number
`workingDaysInDateInterval` | number
`remark` | string

## Example

```typescript
import type { RemoteWork } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "isBeginDateHalfDay": null,
  "isEndDateHalfDay": null,
  "number": null,
  "status": null,
  "statusIdentifier": null,
  "workingDays": 1.5,
  "workingDaysInDateInterval": 1.5,
  "remark": null,
} satisfies RemoteWork

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RemoteWork
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


