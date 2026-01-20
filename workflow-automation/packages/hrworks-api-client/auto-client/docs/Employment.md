
# Employment

Representation of an employment that can be assigned to persons. Used in the historicized data of a person.

## Properties

Name | Type
------------ | -------------
`employmentType` | [EmploymentType](EmploymentType.md)
`organizationUnitNumber` | string
`organizationUnitUuid` | string
`permanentEstablishmentId` | string
`position` | string

## Example

```typescript
import type { Employment } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "employmentType": null,
  "organizationUnitNumber": null,
  "organizationUnitUuid": null,
  "permanentEstablishmentId": null,
  "position": null,
} satisfies Employment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Employment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


