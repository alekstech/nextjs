import { readFileSync } from 'fs';
import { createServer } from 'https';
import createNextApp from 'next';
import express, { Request, Response } from 'express';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const cert:Buffer = readFileSync(__dirname + '/../certificates/localhost.crt');
const key:Buffer = readFileSync(__dirname + '/../certificates/localhost.key');

const hostname = '127.0.0.1';

const next = createNextApp({ dev, hostname, port });
const handler = next.getRequestHandler();

next.prepare().then(() => {
  const app = express();

  app.all('*', (req:Request, res:Response) => {
    return handler(req, res);
  });

  createServer({ cert, key }, app).listen(port, hostname);

  console.log(
    `> Custom server listening at https://${hostname}:${port} as ${
      dev ? 'development' : 'production'
    }`
  );
});