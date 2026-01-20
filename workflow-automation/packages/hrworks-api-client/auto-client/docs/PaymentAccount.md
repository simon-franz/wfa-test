
# PaymentAccount


## Properties

Name | Type
------------ | -------------
`paymentMethod` | string
`accountNumber` | string

## Example

```typescript
import type { PaymentAccount } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "paymentMethod": null,
  "accountNumber": null,
} satisfies PaymentAccount

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PaymentAccount
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


