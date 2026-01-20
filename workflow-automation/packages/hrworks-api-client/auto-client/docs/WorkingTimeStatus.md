
# WorkingTimeStatus

JSON object describing whether a person is currently clocked in or clocked out. Contains additional information about the current working time if the employee is clocked in.

## Properties

Name | Type
------------ | -------------
`clockedIn` | boolean
`workingTime` | [WorkingTime](WorkingTime.md)

## Example

```typescript
import type { WorkingTimeStatus } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "clockedIn": null,
  "workingTime": null,
} satisfies WorkingTimeStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkingTimeStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


