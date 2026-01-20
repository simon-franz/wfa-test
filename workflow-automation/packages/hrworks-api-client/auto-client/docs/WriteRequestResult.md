
# WriteRequestResult

A wrapper object for the result of a write (PUT/POST/DELETE) request against the HR WORKS API. Will EITHER contain one or more errors that occurred while processing the request (meaning the request failed) OR a representation of the objects manipulated/created with the call (meaning the request was successful). Successful requests might also contain warnings that occurred while processing the request, but were ignored.

## Properties

Name | Type
------------ | -------------
`generalErrors` | [Array&lt;ApiError&gt;](ApiError.md)
`dataErrors` | [Array&lt;DataError&gt;](DataError.md)
`status` | string

## Example

```typescript
import type { WriteRequestResult } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "generalErrors": null,
  "dataErrors": null,
  "status": null,
} satisfies WriteRequestResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WriteRequestResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


