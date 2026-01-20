
# Token

A JSON web token. Valid for 15 minutes. Decode the token to see the expiry timestamp and check if your token is still valid before using it for API calls. If the token has already expired, request a new one via the /authentication endpoint.

## Properties

Name | Type
------------ | -------------
`token` | string

## Example

```typescript
import type { Token } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "token": null,
} satisfies Token

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Token
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


