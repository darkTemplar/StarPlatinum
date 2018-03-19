import 'whatwg-fetch';

/**
 * utility for posting to an url
 * @param  {String} url
 * @param  {Object} options
 * @param  {Object} options.body
 * @return {Promise}
 */
export function post(url, options) {
  return fetch(`/api/${url}`, {
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
