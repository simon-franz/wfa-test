
# WorkingTime

Object representing a single working time.

## Properties

Name | Type
------------ | -------------
`beginDateAndTime` | Date
`endDateAndTime` | Date
`clockInKioskId` | number
`clockOutKioskId` | number
`comment` | string
`workingTimeType` | [WorkingTimeType](WorkingTimeType.md)
`project` | [BaseTimeTrackingProject](BaseTimeTrackingProject.md)
`id` | string

## Example

```typescript
import type { WorkingTime } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDateAndTime": null,
  "endDateAndTime": null,
  "clockInKioskId": null,
  "clockOutKioskId": null,
  "comment": null,
  "workingTimeType": null,
  "project": null,
  "id": 1_1683093600,
} satisfies WorkingTime

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkingTime
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


