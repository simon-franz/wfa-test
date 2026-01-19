import type { Config } from 'drizzle-kit';

export default {
  schema: '../shared/src/db/*.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || './dev-tenants/landlord.db',
  },
} satisfies Config;
