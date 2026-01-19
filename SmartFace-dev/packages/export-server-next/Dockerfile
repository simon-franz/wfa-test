# Stage 1: Setup operating system
FROM oven/bun:1.3.3-alpine AS base

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    python3 \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

# Use the system-installed chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app

# Add necessary files and packages
COPY package.json bun.lock bunfig.toml .npmrc ./
# TODO: find a better solution than copying all packages
COPY packages ./packages

# Locate to Export Server and install dependencies
WORKDIR /app/packages/export-server-next
# TODO: fix installation with --production flag
RUN bun install --filter @hrworks/export-server-next --frozen-lockfile

# Stage 3: Build Export Server in Next.js
FROM base AS builder
WORKDIR /app

COPY --from=deps /app /app

# Disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/packages/export-server-next
RUN bun run build

# Stage 4: Production environment (not actual production)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN adduser --system --uid 1001 exportmaster

# Copy necessary files from builder to app's root directory
COPY --from=builder --chown=exportmaster:bun /app/packages/export-server-next/.next/standalone/ ./
COPY --from=builder --chown=exportmaster:bun /app/packages/export-server-next/.next/static/ ./static

USER exportmaster

# Expose the port your app runs on
EXPOSE 3000

# Set the runtime command
CMD ["bun", "./packages/export-server-next/server.js"]
