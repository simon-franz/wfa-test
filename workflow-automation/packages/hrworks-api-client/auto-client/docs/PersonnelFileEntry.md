
# PersonnelFileEntry

A single personnel file entry for a person.

## Properties

Name | Type
------------ | -------------
`category` | [PersonnelFileCategory](PersonnelFileCategory.md)
`creationDate` | Date
`documents` | Array&lt;string&gt;
`id` | string
`name` | string
`notes` | string
`resubmissionDate` | Date
`changeDate` | Date
`changedBy` | string
`createdBy` | [PersonBaseData](PersonBaseData.md)
`isWageRelevant` | boolean

## Example

```typescript
import type { PersonnelFileEntry } from '@hrworks/auto-client'

// TODO: Update the object below with actual values
const example = {
  "category": null,
  "creationDate": null,
  "documents": null,
  "id": null,
  "name": null,
  "notes": null,
  "resubmissionDate": null,
  "changeDate": null,
  "changedBy": null,
  "createdBy": null,
  "isWageRelevant": null,
} satisfies PersonnelFileEntry

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PersonnelFileEntry
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


