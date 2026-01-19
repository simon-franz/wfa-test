// TODO: This is for using the external api. We probably don't need this file in the future but could be useful for development.
export const fetchNewAuthToken = async () => {
  const accessKey = process.env.API_ACCESS_KEY;
  const secretAccessKey = process.env.API_SECRET_ACCESS_KEY;
  const apiEndpoint = `${process.env.API_BASE_URL}/authentication/`;

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessKey: accessKey,
      secretAccessKey: secretAccessKey,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  const data = await response.json();

  return data.token;
};

type CachedToken = {
  value: string;
  expiresAt: number;
};

let cachedToken: CachedToken | null = null;

export const getAuthToken = async (): Promise<string> => {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    console.log('cachedToken expires in ... seconds', Math.floor((cachedToken.expiresAt - Date.now()) / 1000));

    return cachedToken.value;
  }

  const newToken = await fetchNewAuthToken();

  cachedToken = {
    value: newToken,
    expiresAt: Date.now() + 14 * 60 * 1000, // 14 Minutes to be safe (Actually 15)
  };

  return newToken;
};
