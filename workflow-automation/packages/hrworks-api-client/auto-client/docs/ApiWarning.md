
# ApiWarning

The representation of a warning returned by the API. Warnings are generally ignored by write requests and returned only as an fyi.

## Properties

Name | Type
------------ | -------------
`warningNumber` | number
`warningMessage` | string

## Example

```typescript
import type { ApiWarning } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "warningNumber": null,
  "warningMessage": null,
} satisfies ApiWarning

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiWarning
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


