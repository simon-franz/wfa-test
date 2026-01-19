export async function register() {
  const runtime = process.env.NEXT_RUNTIME;
  if (runtime === 'nodejs') {
    await import('../sentry.server.config');
  }
  if (runtime === 'edge') {
    await import('../sentry.edge.config');
  }
}
