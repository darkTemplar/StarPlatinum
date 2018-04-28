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
 * @param  {Object} options
 * @param  {Object} options.body
 * @return {Promise}
 */
export function post(url, options) {
  return fetch(getUrl(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options.body || {}),
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
