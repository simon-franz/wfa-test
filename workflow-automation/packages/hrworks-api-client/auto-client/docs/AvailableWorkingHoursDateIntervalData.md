
# AvailableWorkingHoursDateIntervalData

JSON object representing a date interval with the associated available working hours.

## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`workingHours` | number
`regularWorkingHours` | number
`remarks` | Array&lt;string&gt;
`relatedEvents` | [AvailableWorkingHoursDateIntervalDataRelatedEvents](AvailableWorkingHoursDateIntervalDataRelatedEvents.md)

## Example

```typescript
import type { AvailableWorkingHoursDateIntervalData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "workingHours": null,
  "regularWorkingHours": null,
  "remarks": null,
  "relatedEvents": null,
} satisfies AvailableWorkingHoursDateIntervalData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AvailableWorkingHoursDateIntervalData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


