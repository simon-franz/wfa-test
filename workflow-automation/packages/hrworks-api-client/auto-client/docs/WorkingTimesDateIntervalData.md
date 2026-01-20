
# WorkingTimesDateIntervalData

JSON object representing a date interval with the associated working times.

## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`workingTimeMinutes` | number
`targetWorkingTimeMinutes` | number
`breakDurationMinutes` | number
`workingTimes` | [Array&lt;WorkingTime&gt;](WorkingTime.md)

## Example

```typescript
import type { WorkingTimesDateIntervalData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "workingTimeMinutes": null,
  "targetWorkingTimeMinutes": null,
  "breakDurationMinutes": null,
  "workingTimes": null,
} satisfies WorkingTimesDateIntervalData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkingTimesDateIntervalData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


