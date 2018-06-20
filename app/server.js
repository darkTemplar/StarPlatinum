import { parse } from 'url';
import bodyParser from 'body-parser';
import express from 'express';
import next from 'next';

import apiMiddleware from './middlewares/api';
import currentUserMiddleware from './middlewares/currentUser';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // add api object to request
    server.use(apiMiddleware);
    // auth middleware to get user
    server.use(currentUserMiddleware);

    server.use('/', bodyParser.json());

    // page routes
    server.get('/listing/:listingId', (req, res) => {
      app.render(req, res, '/view_listing');
    });

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/') {
        app.render(req, res, '/home', query);
      } else if (pathname === '/listing/new') {
        app.render(req, res, '/create_listing', query);
      } else {
        handle(req, res, parse(req.url, true));
      }
    });

    const s = server.listen(3000, (err) => {
      if (err) {
        throw err;
      }
      const host = s.address().address;
      const port = s.address().port;
      console.log('> Ready on http://%s:%s', host, port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
