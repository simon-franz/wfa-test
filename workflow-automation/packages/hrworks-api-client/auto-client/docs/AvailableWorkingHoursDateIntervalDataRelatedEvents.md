
# AvailableWorkingHoursDateIntervalDataRelatedEvents

Events related to the day. Only present, if interval is set to days.

## Properties

Name | Type
------------ | -------------
`sickLeaves` | [Array&lt;ApiResourceData&gt;](ApiResourceData.md)
`absences` | [Array&lt;ApiResourceData&gt;](ApiResourceData.md)
`holidays` | [Array&lt;ApiResourceData&gt;](ApiResourceData.md)

## Example

```typescript
import type { AvailableWorkingHoursDateIntervalDataRelatedEvents } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "sickLeaves": null,
  "absences": null,
  "holidays": null,
} satisfies AvailableWorkingHoursDateIntervalDataRelatedEvents

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AvailableWorkingHoursDateIntervalDataRelatedEvents
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


