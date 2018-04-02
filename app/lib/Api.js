import fetch from 'node-fetch';

function getHost() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost';
  } else if (process.env.NODE_ENV === 'production') {
    return '';
  }

  throw new Error('No specified API host');
}

function getPort() {
  if (process.env.NODE_ENV === 'development') {
    return 4000;
  } else if (process.env.NODE_ENV === 'production') {
    return '';
  }

  throw new Error('No specified API port');
}

export default class Api {
  constructor({ host, port } = {}) {
    this.host = host || getHost();
    this.port = port || getPort();
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
