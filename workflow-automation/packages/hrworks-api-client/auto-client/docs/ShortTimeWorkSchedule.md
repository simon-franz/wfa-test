
# ShortTimeWorkSchedule

A short time working schedule.

## Properties

Name | Type
------------ | -------------
`name` | string
`weeklyWorkingHours` | number
`workingDays` | Array&lt;{ [key: string]: WorkScheduleDay; }&gt;

## Example

```typescript
import type { ShortTimeWorkSchedule } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "weeklyWorkingHours": null,
  "workingDays": null,
} satisfies ShortTimeWorkSchedule

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ShortTimeWorkSchedule
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


