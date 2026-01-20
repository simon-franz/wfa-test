
# PersonBaseData


## Properties

Name | Type
------------ | -------------
`externalIds` | [Array&lt;ExternalId&gt;](ExternalId.md)
`firstName` | string
`lastName` | string
`personId` | string
`personnelNumber` | string
`personIdentifierForKiosk` | string
`datevPersonnelNumber` | string
`uuid` | string

## Example

```typescript
import type { PersonBaseData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "externalIds": null,
  "firstName": null,
  "lastName": null,
  "personId": null,
  "personnelNumber": null,
  "personIdentifierForKiosk": null,
  "datevPersonnelNumber": null,
  "uuid": null,
} satisfies PersonBaseData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonBaseData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


