
# BorderCrossing

The representation of a border crossing. Only returned for austrian persons.

## Properties

Name | Type
------------ | -------------
`originCountryCode` | string
`destinationCountryCode` | string
`date` | Date
`time` | string

## Example

```typescript
import type { BorderCrossing } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "originCountryCode": null,
  "destinationCountryCode": null,
  "date": null,
  "time": null,
} satisfies BorderCrossing

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BorderCrossing
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


