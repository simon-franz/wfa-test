
# WorkSchedule

A working schedule.

## Properties

Name | Type
------------ | -------------
`name` | string
`key` | string
`weeklyWorkingHours` | number
`workingDays` | Array&lt;{ [key: string]: WorkScheduleDay; }&gt;

## Example

```typescript
import type { WorkSchedule } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "key": null,
  "weeklyWorkingHours": null,
  "workingDays": null,
} satisfies WorkSchedule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkSchedule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


