
# WorkingTimeKiosk

A time tracking kiosk.

## Properties

Name | Type
------------ | -------------
`name` | string
`id` | number
`useQrCode` | boolean
`usePin` | boolean

## Example

```typescript
import type { WorkingTimeKiosk } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "id": null,
  "useQrCode": null,
  "usePin": null,
} satisfies WorkingTimeKiosk

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WorkingTimeKiosk
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


