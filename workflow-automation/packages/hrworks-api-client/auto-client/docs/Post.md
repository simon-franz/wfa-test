
# Post

Representation of a post. Used in applicant management endpoints.

## Properties

Name | Type
------------ | -------------
`displayName` | string
`name` | string
`key` | string
`uuid` | string
`organizationUnitNumber` | string
`organizationUnitUuid` | string
`contactInformation` | [PostContactInformation](PostContactInformation.md)
`scopeOfActivities` | string
`scopeOfActivitiesKey` | [ScopeOfActivitiesKey](ScopeOfActivitiesKey.md)
`isActive` | boolean
`postImageUrl` | string
`postDescriptions` | [PostDescriptions](PostDescriptions.md)
`postOffers` | [Array&lt;PostOffer&gt;](PostOffer.md)
`howDidYouHearAboutUsOptions` | [HowDidYouHearAboutUsOptions](HowDidYouHearAboutUsOptions.md)

## Example

```typescript
import type { Post } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "displayName": null,
  "name": null,
  "key": null,
  "uuid": null,
  "organizationUnitNumber": null,
  "organizationUnitUuid": null,
  "contactInformation": null,
  "scopeOfActivities": null,
  "scopeOfActivitiesKey": null,
  "isActive": null,
  "postImageUrl": null,
  "postDescriptions": null,
  "postOffers": null,
  "howDidYouHearAboutUsOptions": null,
} satisfies Post

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Post
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


