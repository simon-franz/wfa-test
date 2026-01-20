
# ApiResourceData

Information detailing an object that can be requested via the HR WORKS-API.

## Properties

Name | Type
------------ | -------------
`id` | string
`resourceLocation` | string
`additionalData` | object

## Example

```typescript
import type { ApiResourceData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": 3_25,
  "resourceLocation": http://api.hrworks.de/v2/sick-leaves/3_25,
  "additionalData": null,
} satisfies ApiResourceData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiResourceData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


