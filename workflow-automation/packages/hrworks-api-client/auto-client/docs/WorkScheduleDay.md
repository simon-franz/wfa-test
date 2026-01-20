
# WorkScheduleDay

A work schedule object consists of an array of WorkScheduleDays. Each day is indexed by a sequence number (e.g. first day in the work schedule) which is mapped to a working day JSON object containing the scheduled working hours for said day and a String identifier for the weekday name (e.g. Wednesday). Thus, the day with the sequence number 1 does not necessarily have to be a Monday - it depends on the configuration of the working schedule in HR WORKS.

## Properties

Name | Type
------------ | -------------
`workingHours` | number
`day` | string

## Example

```typescript
import type { WorkScheduleDay } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "workingHours": null,
  "day": null,
} satisfies WorkScheduleDay

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkScheduleDay
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


