
# SingleResult

A wrapper object for a single-object result of a write (PUT/POST/DELETE) request against the HR WORKS API.

## Properties

Name | Type
------------ | -------------
`errors` | [Array&lt;ObjectManipulationNotification&gt;](ObjectManipulationNotification.md)
`warnings` | [Array&lt;ObjectManipulationNotification&gt;](ObjectManipulationNotification.md)
`recordId` | number
`data` | [{ [key: string]: SingleResultDataValue; }](SingleResultDataValue.md)
`resourceLocation` | string

## Example

```typescript
import type { SingleResult } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "errors": null,
  "warnings": null,
  "recordId": null,
  "data": null,
  "resourceLocation": null,
} satisfies SingleResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SingleResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


