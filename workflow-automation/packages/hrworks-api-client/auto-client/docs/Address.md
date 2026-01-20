
# Address


## Properties

Name | Type
------------ | -------------
`additionalData` | string
`city` | string
`country` | string
`fax` | string
`internationalCountryCode` | string
`phone` | string
`state` | string
`street` | string
`streetNumber` | string
`zipCode` | string

## Example

```typescript
import type { Address } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "additionalData": null,
  "city": null,
  "country": null,
  "fax": null,
  "internationalCountryCode": null,
  "phone": null,
  "state": null,
  "street": null,
  "streetNumber": null,
  "zipCode": null,
} satisfies Address

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Address
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


