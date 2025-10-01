import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files (assets)
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
    fallthrough: false
  }));

  // Angular SSR routes
  server.get('**', async (req, res, next) => {
    try {
      // reset status code before render
      (globalThis as any).ngStatusCode = 200;

      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: req.originalUrl,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl }
        ],
      });

      const statusCode = (globalThis as any).ngStatusCode || 200;

      // Prevent caching
      res.removeHeader('ETag');
      res.removeHeader('Last-Modified');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');

      // Send response with correct status
      res.status(statusCode).send(html);
    } catch (err) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`✅ Angular SSR server running at http://localhost:${port}`);
  });
}

run();
