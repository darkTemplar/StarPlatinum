import fetch from 'node-fetch';

function getHost() {
  if (!process.env.API_URL) {
    throw new Error('missing API URL');
  }

  return process.env.API_URL;
}

function getPort() {
  if (!process.env.API_PORT) {
    throw new Error('missing API PORT');
  }

  return process.env.API_PORT;
}

export default class Api {
  constructor() {
    this.host = getHost();
    this.port = getPort();
    this.baseUrl = `${this.host}${this.port ? `:${this.port}` : ''}`;
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

  _fetch(url, method, options = {}, headers = {}) {
    return fetch(`${this.baseUrl}${url}`, options, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    });
  }
}
