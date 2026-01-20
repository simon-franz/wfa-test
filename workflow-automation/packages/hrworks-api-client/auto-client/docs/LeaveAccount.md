
# LeaveAccount

Information about the leave account of an employee in HR WORKS.

## Properties

Name | Type
------------ | -------------
`holidayEntitlement` | number
`requested` | number
`approved` | number
`unplanned` | number
`planned` | number
`expiring` | number
`nextExpirationDate` | Date

## Example

```typescript
import type { LeaveAccount } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "holidayEntitlement": null,
  "requested": null,
  "approved": null,
  "unplanned": null,
  "planned": null,
  "expiring": null,
  "nextExpirationDate": null,
} satisfies LeaveAccount

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LeaveAccount
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


