# STAGE 1: BUILD
FROM oven/bun:1.3.3-alpine AS base

RUN apk add --no-cache \
    libc6-compat \
    curl 

# BUILDER STAGE
FROM base AS builder

WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run --cwd packages/stellenportal build

# STAGE 2: PRODUCTION
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN adduser --system --uid 1001 jobmaster

COPY --from=builder --chown=jobmaster:bun /app/packages/stellenportal/.next/standalone/ ./
COPY --from=builder --chown=jobmaster:bun /app/packages/stellenportal/.next/static/ ./packages/stellenportal/.next/static/

RUN mkdir -p ./packages/stellenportal/public

USER jobmaster

EXPOSE 3000
ENV PORT=3000

CMD ["bun", "packages/stellenportal/server.js"]
