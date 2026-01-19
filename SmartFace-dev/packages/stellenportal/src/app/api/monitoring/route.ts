import type { NextRequest } from 'next/server';

const SENTRY_HOST = 'o4507536703815680.ingest.de.sentry.io';
const SENTRY_PROJECT_IDS = new Set(['4510160287170640']);

export async function POST(request: NextRequest) {
  try {
    const envelope = await request.text();

    const piece = envelope.split('\n')[0];
    const header = JSON.parse(piece);
    const dsn = new URL(header.dsn);
    const projectId = dsn.pathname?.replace('/', '');

    if (dsn.hostname !== SENTRY_HOST) {
      throw new Error(`Invalid Sentry host: ${dsn.hostname}`);
    }

    if (!projectId || !SENTRY_PROJECT_IDS.has(projectId)) {
      throw new Error(`Invalid project ID: ${projectId}`);
    }

    const sentryIngestURL = `https://${SENTRY_HOST}/api/${projectId}/envelope/`;

    const response = await fetch(sentryIngestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
      },
      body: envelope,
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  } catch (error) {
    console.error('Sentry tunnel error:', error);

    return new Response('Bad Request', { status: 400 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}
