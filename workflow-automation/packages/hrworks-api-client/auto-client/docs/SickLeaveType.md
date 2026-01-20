
# SickLeaveType

A type that can be assigned to sick leaves in HR WORKS.

## Properties

Name | Type
------------ | -------------
`name` | string
`key` | string
`isActive` | boolean
`color` | string
`isAdminOnly` | boolean
`isPublic` | boolean
`isSicknessOfChild` | boolean
`useInMonthPayroll` | boolean

## Example

```typescript
import type { SickLeaveType } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "key": null,
  "isActive": null,
  "color": null,
  "isAdminOnly": null,
  "isPublic": null,
  "isSicknessOfChild": null,
  "useInMonthPayroll": null,
} satisfies SickLeaveType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SickLeaveType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


