import Api from '../../lib/Api';

export default function createListingHandler(req, res) {
  const {
    body: {
      sqft,
      bedrooms,
      bathrooms,
      lot,
      photos,
      shareDisclosure,
      disclosures,
    } = {},
  } = req;

  const api = new Api();

  try {
    api.post('/api/listing')
      .then(() => {
        res.json({
          sqft,
          bedrooms,
          bathrooms,
          lot,
          photos,
          disclosures,
          shareDisclosure,
        });
      });
  } catch (ex) {
    console.error(ex.message);

    res.status(500).json({
      errorMessage: 'Api createListingHandler error',
    });
  }
}
