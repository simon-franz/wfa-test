
# WorkingTimeType

A time tracking type.

## Properties

Name | Type
------------ | -------------
`name` | string
`type` | [WorkingTimeTypes](WorkingTimeTypes.md)

## Example

```typescript
import type { WorkingTimeType } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "type": null,
} satisfies WorkingTimeType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkingTimeType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


