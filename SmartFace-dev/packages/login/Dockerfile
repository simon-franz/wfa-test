# STAGE 1: SETUP ENVIRONMENT, INSTALL DEPENDENCIES & BUILD PROJECT
FROM oven/bun:1.3.3-alpine AS base

WORKDIR /app
# TODO: Don't copy whole repository, add only necessary packages.
COPY . .
ENV DOCKER_BUILD=true
ENV CYPRESS_INSTALL_BINARY=0
ENV NODE_ENV=production
RUN bun install --filter @hrworks/login --frozen-lockfile --ignore-scripts
RUN bun run --cwd packages/login build


# STAGE 2: SETUP PRODUCTION ENVIRONMENT
FROM base AS runner
WORKDIR /app

# For Health Check
RUN apk add --no-cache curl

RUN adduser --system --uid 1001 loginmaster

COPY --from=base --chown=loginmaster:bun /app/packages/login/.next/standalone/ ./
COPY --from=base --chown=loginmaster:bun /app/packages/login/.next/static/ ./packages/login/.next/static/

RUN mkdir -p ./packages/login/public

# TODO: find out why .env.development is not loaded in server.js after build


EXPOSE 3000
ENV PORT=3000
# To define PORT or HOSTNAME environment variables before running server.js
# e.g. like this http://0.0.0.0:8080, execute this:
# PORT=8080 HOSTNAME=0.0.0.0 bun server.js 

CMD ["bun", "packages/login/server.js"]
