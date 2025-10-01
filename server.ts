import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files (assets like JS, CSS, images)
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
    fallthrough: false
  }));

  // Angular SSR routes
  server.get('**', async (req, res, next) => {
    try {
      // Reset default status
      (globalThis as any).ngStatusCode = 200;

      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: req.originalUrl,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
        ],
      });

      const statusCode = (globalThis as any).ngStatusCode || 200;
      res.status(statusCode).send(html);

    } catch (err) {
      next(err);
    }
  });

  // ✅ Fallback for anything that SSR cannot handle
  // This is where your suggested code goes
  server.use((req, res) => {
    res.status(404).sendFile(join(browserDistFolder, 'index.html'));
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
