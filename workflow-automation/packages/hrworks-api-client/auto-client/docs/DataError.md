
# DataError

The representation of an error returned by the API.

## Properties

Name | Type
------------ | -------------
`recordId` | number
`errors` | [Array&lt;ObjectManipulationNotification&gt;](ObjectManipulationNotification.md)

## Example

```typescript
import type { DataError } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "recordId": null,
  "errors": null,
} satisfies DataError

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DataError
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


