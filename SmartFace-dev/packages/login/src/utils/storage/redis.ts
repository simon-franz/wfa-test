import Redis from 'ioredis';

let redisClient: Redis | null = null;

const createRedisClient = (): Redis => {
  return new Redis({
    host: process.env.REDIS_HOST,
    port: Number.parseInt(process.env.REDIS_PORT!, 10),
    password: process.env.REDIS_PASSWORD,
    keyPrefix: '2fa:',
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    connectTimeout: 10_000,
    keepAlive: 30_000,
    // tls: true // AWS ElastiCache: Only if  "Encryption in Transit" enabled
  });
};

export const getRedisClient = (): Redis => {
  if (!redisClient) {
    redisClient = createRedisClient();
  }

  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
};
