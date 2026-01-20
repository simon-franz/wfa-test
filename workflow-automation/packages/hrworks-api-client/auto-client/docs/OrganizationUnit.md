
# OrganizationUnit


## Properties

Name | Type
------------ | -------------
`parentOrganizationUnit` | [OrganizationUnit](OrganizationUnit.md)
`number` | string
`name` | string
`additionalName` | string
`sapCodeType` | [SapCodeType](SapCodeType.md)
`sapUnitCode` | string
`countryCode` | string
`uuid` | string

## Example

```typescript
import type { OrganizationUnit } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "parentOrganizationUnit": null,
  "number": null,
  "name": null,
  "additionalName": null,
  "sapCodeType": null,
  "sapUnitCode": null,
  "countryCode": null,
  "uuid": null,
} satisfies OrganizationUnit

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationUnit
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


