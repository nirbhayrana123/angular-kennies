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
  index: false, // don't serve index.html for JS/CSS requests
}));

  // ✅ SSR for all other routes
server.get('*', (req, res, next) => {
  commonEngine.render({
    bootstrap,
    documentFilePath: indexHtml,
    url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
    publicPath: browserDistFolder,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  })
  .then(html => res.send(html))
  .catch(err => next(err));
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
