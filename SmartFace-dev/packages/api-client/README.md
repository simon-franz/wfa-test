# Api-Client for the use of the HR WORKS internal (server to server) api

## How to use?

In your App create a new file where you create a new instance of ApiClient and set the baseUrl:

```typescript
import { ApiClient } from '@hrworks/api-client';

export const apiClient = new ApiClient({
  baseUrl: process.env.API_BASE_URL,
});
```

Then you can use this instance in a server-function like this:

```typescript
import type { Post } from '@hrworks/stellenportal/types/post';

import { apiClient } from './api';

type PostsResponse = {
  posts: Post[];
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<PostsResponse>('/applicant-management/posts/');
  return response.posts;
};
```
