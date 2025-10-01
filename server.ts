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

  // Serve static files ONLY for assets (*.js, *.css, images etc.)
server.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y',
}));

server.get('**', async (req, res, next) => {
  try {
    (global as any).ngStatusCode = 200; // reset before render

    const { protocol, originalUrl, baseUrl, headers } = req;

    const html = await commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
      ],
    });

    const statusCode = (global as any).ngStatusCode || 200;

    // prevent caching
    res.removeHeader('ETag');
    res.removeHeader('Last-Modified');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    // ✅ Send correct status code here
    res.status(statusCode).send(html);

  } catch (err) {
    next(err);
  }
});





  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`✅ Node Express server listening on http://localhost:${port}`);
  });
}

run();
