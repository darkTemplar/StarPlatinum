import _omit from 'lodash/omit';
import fetch from 'node-fetch';

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

export default class Api {
  constructor(options = {}) {
    this.host = getHost();
    this.port = getPort();
    this.baseUrl = `${this.host}${this.port ? `:${this.port}/api` : ''}`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.options = options || {};
  }

  get(url, options = {}) {
    return this._fetch(url, 'GET', options);
  }

  post(url, options = {}) {
    return this._fetch(url, 'POST', options);
  }

  _fetch(url, method, options = {}) {
    return fetch(`${this.baseUrl}${url}`, {
      ...this.options,
      method,
      headers: {
        ...this.defaultHeaders,
        ...(options.headers || {}),
      },
      ..._omit(options, 'headers'),
    });
  }
}
