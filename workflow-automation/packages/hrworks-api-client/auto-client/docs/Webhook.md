
# Webhook

Object representing a single webhook.

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`resource` | [WebhookResource](WebhookResource.md)
`action` | [WebhookAction](WebhookAction.md)
`url` | string
`accessKey` | string
`isActive` | boolean
`remark` | string
`integration` | string

## Example

```typescript
import type { Webhook } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "resource": null,
  "action": null,
  "url": null,
  "accessKey": null,
  "isActive": null,
  "remark": null,
  "integration": null,
} satisfies Webhook

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Webhook
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


