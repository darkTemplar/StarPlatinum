import 'whatwg-fetch';
import urlParser from 'url';

function getHost() {
  return process.env.API_HOST;
}

function getPort() {
  return process.env.API_PORT;
}

function getUrl(url) {
  const parsedUrlObject = urlParser.parse(url, true);

  return urlParser.format({
    hostname: getHost(),
    port: getPort(),
    pathname: `/api/${parsedUrlObject.pathname}`,
    query: parsedUrlObject.query,
  });
}

/**
 * utility for posting to an url
 * @param  {String} url
 * @param  {String} method HTTP method: 'POST', 'GET', 'PUT', 'DELETE'
 * @param  {Object} options
 * @param  {Object} options.body
 * @return {Promise}
 */
function _fetch(url, method, options = {}) {
  return fetch(getUrl(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body || {}),
    credentials: 'include',
  })
    .then(
      response => response.json(),
      (error) => {
        throw error;
      },
    )
    .catch((ex) => {
      // TODO need to log error
      throw new Error(ex.message);
    });
}

export function post(url, options ={}) {
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

