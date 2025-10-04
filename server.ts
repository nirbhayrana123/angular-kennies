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

  // ✅ Serve static files first
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false, // JS/CSS files should not return index.html
  }));

  // ✅ SSR for all other routes 
server.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => {
      // Agar NotFoundComponent render hua to 404 bhejo
      if (html.includes('<app-not-found')) {
        res.status(404).send(html);
      } else {
        res.status(200).send(html);
      }
    })
    .catch((err) => next(err));
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
