
# TimeRecordingRegulation

JSON object describing time recording regulations that can be assigned to employees.

## Properties

Name | Type
------------ | -------------
`title` | string
`key` | string
`isOnline` | boolean
`isKiosk` | boolean
`workingTimeTypes` | [Array&lt;WorkingTimeType&gt;](WorkingTimeType.md)
`kiosks` | [Array&lt;WorkingTimeKiosk&gt;](WorkingTimeKiosk.md)
`earliestBeginTime` | string
`latestEndTime` | string
`editingPeriod` | [UnitValueTuple](UnitValueTuple.md)

## Example

```typescript
import type { TimeRecordingRegulation } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "key": null,
  "isOnline": null,
  "isKiosk": null,
  "workingTimeTypes": null,
  "kiosks": null,
  "earliestBeginTime": null,
  "latestEndTime": null,
  "editingPeriod": null,
} satisfies TimeRecordingRegulation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimeRecordingRegulation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


