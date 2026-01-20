
# WorkingTimeData

A working time object.

## Properties

Name | Type
------------ | -------------
`personnelNumber` | string
`personIdentifierForKiosk` | string
`beginDateAndTime` | Date
`endDateAndTime` | Date
`type` | string
`projectNumber` | number
`clockInKioskId` | number
`clockOutKioskId` | number
`comment` | string

## Example

```typescript
import type { WorkingTimeData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "personnelNumber": null,
  "personIdentifierForKiosk": null,
  "beginDateAndTime": null,
  "endDateAndTime": null,
  "type": null,
  "projectNumber": null,
  "clockInKioskId": null,
  "clockOutKioskId": null,
  "comment": null,
} satisfies WorkingTimeData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkingTimeData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


