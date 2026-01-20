
# ReceiptType


## Properties

Name | Type
------------ | -------------
`name` | string
`category` | [ReceiptCategory](ReceiptCategory.md)
`key` | string
`receiptTypeDeduction` | number
`isZeroAmountAllowed` | boolean
`isCancellationReceipt` | boolean
`isActive` | boolean
`receiptTypeAccounts` | [Array&lt;ReceiptTypeAccount&gt;](ReceiptTypeAccount.md)

## Example

```typescript
import type { ReceiptType } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "category": null,
  "key": null,
  "receiptTypeDeduction": null,
  "isZeroAmountAllowed": null,
  "isCancellationReceipt": null,
  "isActive": null,
  "receiptTypeAccounts": null,
} satisfies ReceiptType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ReceiptType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


