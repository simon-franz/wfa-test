
# ProjectTeam

Object representing the team of a time tracking project

## Properties

Name | Type
------------ | -------------
`activePersons` | [Array&lt;PersonBaseData&gt;](PersonBaseData.md)
`inactivePersons` | [Array&lt;PersonBaseData&gt;](PersonBaseData.md)

## Example

```typescript
import type { ProjectTeam } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "activePersons": null,
  "inactivePersons": null,
} satisfies ProjectTeam

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProjectTeam
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


