
# PostDescriptions

Description texts of a post. Used in applicant management endpoints.

## Properties

Name | Type
------------ | -------------
`introduction` | [TitleDescriptionPair](TitleDescriptionPair.md)
`tasks` | [TitleDescriptionPair](TitleDescriptionPair.md)
`profile` | [TitleDescriptionPair](TitleDescriptionPair.md)
`offer` | [TitleDescriptionPair](TitleDescriptionPair.md)
`summary` | [TitleDescriptionPair](TitleDescriptionPair.md)

## Example

```typescript
import type { PostDescriptions } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "introduction": null,
  "tasks": null,
  "profile": null,
  "offer": null,
  "summary": null,
} satisfies PostDescriptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PostDescriptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


