
# PersonHistoricizedAddressData


## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`data` | [Address](Address.md)

## Example

```typescript
import type { PersonHistoricizedAddressData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "data": null,
} satisfies PersonHistoricizedAddressData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonHistoricizedAddressData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


