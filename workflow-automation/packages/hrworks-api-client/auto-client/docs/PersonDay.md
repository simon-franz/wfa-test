
# PersonDay


## Properties

Name | Type
------------ | -------------
`targetWorkingTime` | number
`holidays` | [Array&lt;Holiday&gt;](Holiday.md)
`workingTimes` | [Array&lt;WorkingTime&gt;](WorkingTime.md)
`absences` | [Array&lt;Absence&gt;](Absence.md)
`sickLeaves` | [Array&lt;SickLeave&gt;](SickLeave.md)
`travelRequests` | [Array&lt;TravelRequest&gt;](TravelRequest.md)
`expenseReports` | [Array&lt;ExpenseReport&gt;](ExpenseReport.md)
`remoteWork` | [Array&lt;RemoteWork&gt;](RemoteWork.md)
`previousDayTimeAccountBalance` | number

## Example

```typescript
import type { PersonDay } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "targetWorkingTime": null,
  "holidays": null,
  "workingTimes": null,
  "absences": null,
  "sickLeaves": null,
  "travelRequests": null,
  "expenseReports": null,
  "remoteWork": null,
  "previousDayTimeAccountBalance": null,
} satisfies PersonDay

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonDay
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


