import { sqwTheme } from '@hrworks/design-system/theme/generatedThemes/sqwTheme';
import { captureException } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

import { TreeGraph } from '../../../components/TreeGraph/TreeGraph';
import type { TreeGraphServerData } from '../../../components/TreeGraph/TreeGraph.types';
import { checkAuth } from '../../../utils/checkAuth';
import { handleError } from '../../../utils/errorHandler';
import NextCors from '../../../utils/nextCors';
import ReactDOMServer from 'react-dom/server.bun';

const MAX_DIMENSION = 29_000; // The dimension where @xyflow/react can't handle the scaling anymore
const SCALE_DIMENSION = 15_000; // Technically the limit for Puppeteer is 16_384 but that's a big ass image
const TIMEOUT_DURATION = 55_000; // 55 seconds

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const timeoutId = setTimeout(() => {
    if (!res.headersSent) {
      const error = new Error(`Export request timed out after ${TIMEOUT_DURATION} ms`);
      captureException(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(504).json({ error: 'Export request timed out' });
    }
  }, TIMEOUT_DURATION);

  await NextCors(req, res, {
    // Options
    methods: ['POST'],
    origin: process.env.CORS_ALLOWED_DOMAIN || '*',
  });

  await checkAuth(req, res);

  const scaleDownDimensions = (width: number, height: number): [number, number] => {
    const aspectRatio = width / height;

    if (width > SCALE_DIMENSION || height > SCALE_DIMENSION) {
      if (width > height) {
        width = SCALE_DIMENSION;
        height = Math.round(width / aspectRatio);
      } else {
        height = SCALE_DIMENSION;
        width = Math.round(height * aspectRatio);
      }
    }

    return [Math.floor(width), Math.floor(height)];
  };

  let browser;

  try {
    const data: TreeGraphServerData = req.body;

    if (!data.width || !data.height) {
      const error = new Error(`Width or height is undefined, width: ${data.width}, height: ${data.height}`);
      res.status(400).send({ error: error.message });
      captureException(error);

      return;
    }

    // if width or height > 16384 Export will fail so return
    // https://github.com/puppeteer/puppeteer/issues/477
    if (data.width >= MAX_DIMENSION || data.height >= MAX_DIMENSION) {
      const error = new Error(
        `Too many nodes. Dimension exceeding ${MAX_DIMENSION} (width: ${data.width}, height: ${data.height})`,
      );
      captureException(error);
      res.status(400).send({ error: error.message });

      return;
    }

    const [width, height] = scaleDownDimensions(data.width, data.height);

    const html = `
    <!DOCTYPE html>
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
            body {
              background-color: transparent;
              margin: 0;
              padding: 0;
            }
            </style>
        </head>
        <body>
          ${ReactDOMServer.renderToString(
            <TreeGraph
              nodes={data.nodes}
              edges={data.edges}
              background={data.background}
              width={width}
              height={height}
              highlightColor={data.highlightColor || sqwTheme.sqwTier1.color.indigo[70]}
            />,
          )}</body></html>`;

    // Use Puppeteer to take a screenshot
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width, height });

    let file;
    switch (data.format) {
      case 'export-as-jpeg':
        file = await page.screenshot({ quality: 100, type: 'jpeg', fullPage: true });
        res.setHeader('Content-Type', 'image/jpeg');
        break;
      case 'export-as-pdf':
        const widthInches = width / 96;
        const heightInches = height / 96;
        file = Buffer.from(
          await page.pdf({
            width: `${widthInches}in`,
            height: `${heightInches}in`,
            printBackground: true,
          }),
        );
        res.setHeader('Content-Type', 'application/pdf');
        break;
      case 'export-as-png':
      case 'print':
        file = await page.screenshot({ type: 'png', omitBackground: true, fullPage: true });
        res.setHeader('Content-Type', 'image/png');
        break;
    }
    res.send(file);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    captureException(error);

    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(statusCode).json({ error: message });
    }
  } finally {
    clearTimeout(timeoutId);
    if (browser) {
      await browser.close();
    }
  }
}
