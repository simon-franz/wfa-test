
# Holiday

The representation of a holiday in HR WORKS.

## Properties

Name | Type
------------ | -------------
`date` | Date
`isHalfDay` | boolean
`name` | string

## Example

```typescript
import type { Holiday } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "date": null,
  "isHalfDay": null,
  "name": null,
} satisfies Holiday

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Holiday
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


