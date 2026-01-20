
# Credentials

A key pair consisting of the public accessKey and the private secretAccessKey. Generated in HR WORKS and used to get access tokens for the API.

## Properties

Name | Type
------------ | -------------
`accessKey` | string
`secretAccessKey` | string

## Example

```typescript
import type { Credentials } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "accessKey": null,
  "secretAccessKey": null,
} satisfies Credentials

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Credentials
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


