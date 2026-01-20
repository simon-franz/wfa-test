
# TimeAccount

JSON object representing a time account of a person in HR WORKS

## Properties

Name | Type
------------ | -------------
`monthYear` | string
`workingHours` | number
`targetWorkingHours` | number
`timeCredit` | number
`carryoverHours` | number
`totalTime` | number
`timeCorrectionSum` | number

## Example

```typescript
import type { TimeAccount } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "monthYear": null,
  "workingHours": null,
  "targetWorkingHours": null,
  "timeCredit": null,
  "carryoverHours": null,
  "totalTime": null,
  "timeCorrectionSum": null,
} satisfies TimeAccount

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimeAccount
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


