import 'whatwg-fetch';
import urlParser from 'url';

function getHost() {
  if (process.env.DOCKER_ENABLED !== 'true') {
    return process.env.API_HOST;
  }

  return undefined;
}

function getPort() {
  if (process.env.DOCKER_ENABLED !== 'true') {
    return process.env.API_PORT;
  }

  return undefined;
}

function getUrl(url, query = {}) {
  const parsedUrlObject = urlParser.parse(url, true);

  return urlParser.format({
    hostname: getHost(),
    port: getPort(),
    pathname: `/api/${parsedUrlObject.pathname}`,
    query: {
      ...parsedUrlObject.query,
      ...query,
    },
  });
}

/**
 * utility for posting to an url
 * @param  {String} url
 * @param  {String} method HTTP method: 'POST', 'GET', 'PUT', 'DELETE'
 * @param  {Object} options
 * @param  {Object} options.body
 * @param  {Object} options.query
 * @return {Promise}
 */
function _fetch(url, method, options = {}) {
  return fetch(getUrl(url, options.query), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method === 'GET' ? undefined : JSON.stringify(options.body || {}),
    credentials: 'include',
  })
    .then(
      response => {
        if (response.status >= 400 && response.status < 600) {
          return response.json()
            .then((res) => {
              throw res;
            });
        }

        return response.json();
      },
      (error) => {
        throw error;
      },
    )
    .catch((ex) => {
      throw ex;
    });
}

export function post(url, options = {}) {
  return _fetch(url, 'POST', options);
}

export function del(url, options = {}) {
  return _fetch(url, 'DELETE', options);
}

export function get(url, options = {}) {
  return _fetch(url, 'GET', options);
}

export function put(url, options) {
  return _fetch(url, 'PUT', options);
}
