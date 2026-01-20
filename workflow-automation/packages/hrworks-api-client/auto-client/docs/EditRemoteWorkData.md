
# EditRemoteWorkData


## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`isBeginDateHalfDay` | boolean
`isEndDateHalfDay` | boolean
`statusIdentifier` | [RemoteWorkStatus](RemoteWorkStatus.md)
`number` | string

## Example

```typescript
import type { EditRemoteWorkData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "isBeginDateHalfDay": null,
  "isEndDateHalfDay": null,
  "statusIdentifier": null,
  "number": 1_1,
} satisfies EditRemoteWorkData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EditRemoteWorkData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


