
# TimeTrackingProject

Object representing a single time tracking project.

## Properties

Name | Type
------------ | -------------
`id` | string
`number` | number
`name` | string
`beginDate` | Date
`endDate` | Date
`description` | string
`parentProject` | number
`statusIdentifier` | [TimeTrackingProjectStatus](TimeTrackingProjectStatus.md)
`status` | string
`hourlyBudget` | string
`hasSubProjects` | boolean
`projectManager` | [PersonBaseData](PersonBaseData.md)
`customer` | [TimeTrackingProjectBaseCustomer](TimeTrackingProjectBaseCustomer.md)
`projectTeam` | [ProjectTeam](ProjectTeam.md)

## Example

```typescript
import type { TimeTrackingProject } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "number": null,
  "name": null,
  "beginDate": null,
  "endDate": null,
  "description": null,
  "parentProject": null,
  "statusIdentifier": null,
  "status": null,
  "hourlyBudget": null,
  "hasSubProjects": null,
  "projectManager": null,
  "customer": null,
  "projectTeam": null,
} satisfies TimeTrackingProject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TimeTrackingProject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


