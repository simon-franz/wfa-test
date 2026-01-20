
# SickLeaveChild

The child related to the sickness. Only included if the sickness is a sickness of a child.

## Properties

Name | Type
------------ | -------------
`firstName` | string
`birthday` | Date
`lastName` | string

## Example

```typescript
import type { SickLeaveChild } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "firstName": null,
  "birthday": null,
  "lastName": null,
} satisfies SickLeaveChild

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SickLeaveChild
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


