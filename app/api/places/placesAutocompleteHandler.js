import GooglePlacesAutocomplete from '../../lib/GooglePlacesAutocomplete';

export default function placesAutocompleteHandler(req, res) {
  const {
    body: {
      value,
    },
  } = req;

  const googlePlacesAutocomplete = new GooglePlacesAutocomplete();

  return googlePlacesAutocomplete.autocomplete(value)
    .then((response) => {
      res.json({
        suggestions: response.predictions,
      });
    })
    .catch(ex => {
    });
}
