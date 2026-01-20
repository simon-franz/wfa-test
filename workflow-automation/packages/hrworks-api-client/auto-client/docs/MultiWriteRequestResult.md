
# MultiWriteRequestResult


## Properties

Name | Type
------------ | -------------
`generalErrors` | [Array&lt;ApiError&gt;](ApiError.md)
`dataErrors` | [Array&lt;DataError&gt;](DataError.md)
`status` | string
`result` | [Array&lt;SingleResult&gt;](SingleResult.md)

## Example

```typescript
import type { MultiWriteRequestResult } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "generalErrors": null,
  "dataErrors": null,
  "status": null,
  "result": null,
} satisfies MultiWriteRequestResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MultiWriteRequestResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


