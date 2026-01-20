
# AccumulatedRemoteWorkDateIntervalData

JSON object representing a date interval with the associated remote work values.

## Properties

Name | Type
------------ | -------------
`beginDate` | Date
`endDate` | Date
`remoteWork` | { [key: string]: number; }

## Example

```typescript
import type { AccumulatedRemoteWorkDateIntervalData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "beginDate": null,
  "endDate": null,
  "remoteWork": null,
} satisfies AccumulatedRemoteWorkDateIntervalData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccumulatedRemoteWorkDateIntervalData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


