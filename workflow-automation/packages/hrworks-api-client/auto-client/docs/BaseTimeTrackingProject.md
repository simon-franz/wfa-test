
# BaseTimeTrackingProject

Time tracking project.

## Properties

Name | Type
------------ | -------------
`name` | string
`id` | string
`number` | number

## Example

```typescript
import type { BaseTimeTrackingProject } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "id": null,
  "number": null,
} satisfies BaseTimeTrackingProject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BaseTimeTrackingProject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


