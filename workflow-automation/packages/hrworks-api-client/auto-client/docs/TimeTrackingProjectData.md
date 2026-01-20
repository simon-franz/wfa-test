
# TimeTrackingProjectData

Object representing a single time tracking project.

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`beginDate` | Date
`endDate` | Date
`description` | string
`parentProjectId` | string
`status` | [TimeTrackingProjectStatus](TimeTrackingProjectStatus.md)
`hourlyBudget` | number
`projectManagerPersonnelNumber` | string
`customerId` | string

## Example

```typescript
import type { TimeTrackingProjectData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "beginDate": null,
  "endDate": null,
  "description": null,
  "parentProjectId": null,
  "status": null,
  "hourlyBudget": null,
  "projectManagerPersonnelNumber": null,
  "customerId": null,
} satisfies TimeTrackingProjectData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimeTrackingProjectData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


