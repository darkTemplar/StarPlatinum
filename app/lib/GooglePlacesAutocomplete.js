import fetch from 'node-fetch';
import _get from 'lodash/get';
import url from 'url';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const DEV_KEY = 'AIzaSyDuQdd-nksH4KfNKHIfYRWxvJYB7WrhGBw';

export default class GooglePlacesAutocomplete {
  constructor(config) {
    this.key = _get(config, 'key', DEV_KEY);
    this.types = _get(config, 'types', ['address']);
  }

  autocomplete(value) {
    const urlObject = url.parse(BASE_URL);

    return fetch(url.format({
      ...urlObject,
      query: {
        key: this.key,
        input: value,
        types: this.types,
      },
    }), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
  }
}
