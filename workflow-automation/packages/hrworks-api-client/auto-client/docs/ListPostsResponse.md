
# ListPostsResponse


## Properties

Name | Type
------------ | -------------
`posts` | [Array&lt;Post&gt;](Post.md)

## Example

```typescript
import type { ListPostsResponse } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "posts": null,
} satisfies ListPostsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListPostsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


