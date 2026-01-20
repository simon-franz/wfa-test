
# ExpensesGroup

An expenses group for travel expenses accounting.

## Properties

Name | Type
------------ | -------------
`key` | string
`name` | string
`internationalCountryCode` | string

## Example

```typescript
import type { ExpensesGroup } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "key": null,
  "name": null,
  "internationalCountryCode": DEU,
} satisfies ExpensesGroup

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ExpensesGroup
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


