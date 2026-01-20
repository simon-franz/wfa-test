
# EditWebhookData


## Properties

Name | Type
------------ | -------------
`action` | [WebhookAction](WebhookAction.md)
`name` | string
`resource` | [WebhookResource](WebhookResource.md)
`url` | string
`accessKey` | string
`isActive` | boolean
`remark` | string
`id` | number

## Example

```typescript
import type { EditWebhookData } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "action": null,
  "name": null,
  "resource": null,
  "url": null,
  "accessKey": null,
  "isActive": null,
  "remark": null,
  "id": null,
} satisfies EditWebhookData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EditWebhookData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


