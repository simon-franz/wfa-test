
# SickLeavesDateIntervalData

JSON object representing a date interval with the associated sick leaves.

## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`sickLeaves` | [Array&lt;SickLeave&gt;](SickLeave.md)

## Example

```typescript
import type { SickLeavesDateIntervalData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "sickLeaves": null,
} satisfies SickLeavesDateIntervalData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SickLeavesDateIntervalData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


