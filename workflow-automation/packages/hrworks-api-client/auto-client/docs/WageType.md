
# WageType

JSON object representing a wage type.

## Properties

Name | Type
------------ | -------------
`number` | number
`isActive` | boolean
`exportKey` | string
`type` | string
`name` | string
`internationalCountryCode` | string
`importKey` | string

## Example

```typescript
import type { WageType } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "number": null,
  "isActive": null,
  "exportKey": null,
  "type": null,
  "name": null,
  "internationalCountryCode": null,
  "importKey": null,
} satisfies WageType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WageType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


