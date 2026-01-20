
# PermanentEstablishment

A physical business location of the company.

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`address` | [Address](Address.md)
`number` | string

## Example

```typescript
import type { PermanentEstablishment } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "address": null,
  "number": null,
} satisfies PermanentEstablishment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PermanentEstablishment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


