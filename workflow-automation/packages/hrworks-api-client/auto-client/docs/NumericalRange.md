
# NumericalRange

A range determined by a numerical upper and lower limit.

## Properties

Name | Type
------------ | -------------
`lowerBound` | number
`upperBound` | number

## Example

```typescript
import type { NumericalRange } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "lowerBound": null,
  "upperBound": null,
} satisfies NumericalRange

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as NumericalRange
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


