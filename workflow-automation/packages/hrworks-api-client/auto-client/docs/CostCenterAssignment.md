
# CostCenterAssignment

An assignment of a cost center to either a person or an organization unit.

## Properties

Name | Type
------------ | -------------
`number` | string
`personIdentifier` | string
`personnelNumber` | string
`organizationUnitNumber` | string

## Example

```typescript
import type { CostCenterAssignment } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "number": null,
  "personIdentifier": null,
  "personnelNumber": null,
  "organizationUnitNumber": null,
} satisfies CostCenterAssignment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CostCenterAssignment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


