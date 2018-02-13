import bodyParser from 'body-parser';
import express from 'express';
import next from 'next';

import { parse } from 'url';

import api from './api';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // parse application/json
    server.use('/api', bodyParser.json({ limit: '100mb' }));

    // parse application/x-www-form-urlencoded
    server.use('/api', bodyParser.urlencoded({ extended: false }));

    // regular non api route
    server.use('/', bodyParser.json());

    // api routes
    server.use('/api', api);

    // page routes
    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/') {
        app.render(req, res, '/home', query);
      } else if (pathname === '/listing/new') {
        app.render(req, res, '/create_listing', query);
      } else {
        handle(req, res, parsedUrl);
      }
    });

    server.listen(3000, (err) => {
      if (err) {
        throw err;
      }

      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
