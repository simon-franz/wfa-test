
# TimeTrackingProjectAssignmentData

Object representing a single time tracking project assignment.

## Properties

Name | Type
------------ | -------------
`personIdentifier` | string
`projectNumber` | number
`isActive` | boolean

## Example

```typescript
import type { TimeTrackingProjectAssignmentData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "personIdentifier": null,
  "projectNumber": null,
  "isActive": null,
} satisfies TimeTrackingProjectAssignmentData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimeTrackingProjectAssignmentData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


