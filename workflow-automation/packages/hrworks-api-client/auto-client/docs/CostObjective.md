
# CostObjective

Used in cost accounting. An entity to which costs are assigned.

## Properties

Name | Type
------------ | -------------
`name` | string
`number` | string

## Example

```typescript
import type { CostObjective } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "number": null,
} satisfies CostObjective

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CostObjective
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


