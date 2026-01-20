
# CreatePersonWorkingTimeResponse


## Properties

Name | Type
------------ | -------------
`result` | [WorkingTime](WorkingTime.md)
`warnings` | [Array&lt;ApiWarning&gt;](ApiWarning.md)

## Example

```typescript
import type { CreatePersonWorkingTimeResponse } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "result": null,
  "warnings": null,
} satisfies CreatePersonWorkingTimeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreatePersonWorkingTimeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


