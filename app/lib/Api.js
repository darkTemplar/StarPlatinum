import _omit from 'lodash/omit';
import _get from 'lodash/get';
import fetch from 'node-fetch';
import urlParser from 'url';

function getHost() {
  if (!process.env.API_HOST) {
    throw new Error('missing API HOST');
  }

  return process.env.API_HOST;
}

function getPort() {
  if (!process.env.API_PORT) {
    throw new Error('missing API PORT');
  }

  return process.env.API_PORT;
}

const DEFAULT_HTTP_PROTOCOL = 'http';

export default class Api {
  constructor(options = {}) {
    this.host = getHost();
    this.port = getPort();
    this.protocol = _get(options, 'protocol', DEFAULT_HTTP_PROTOCOL);
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  get(url, options = {}) {
    return this._fetch(url, 'GET', options);
  }

  post(url, options = {}) {
    return this._fetch(url, 'POST', options);
  }

  _getUrl(url) {
    const parsedUrlObject = urlParser.parse(url, true);

    return urlParser.format({
      protocol: this.protocol,
      hostname: this.host,
      port: this.port,
      pathname: `/api/${parsedUrlObject.pathname}`,
      query: parsedUrlObject.query,
    });
  }

  _fetch(url, method, options = {}) {
    return fetch(this._getUrl(url), {
      method,
      headers: {
        ...this.defaultHeaders,
        ...(options.headers || {}),
      },
      ..._omit(options, 'headers'),
    });
  }
}
