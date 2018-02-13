export default function createListingHandler(req, res) {
  const {
    body: {
      sqft,
      bedrooms,
      bathrooms,
      lot,
      photos,
    } = {},
  } = req;

  try {
    res.json({
      sqft,
      bedrooms,
      bathrooms,
      lot,
      photos,
    });
  } catch (ex) {
    console.error(ex.message);

    res.status(500).json({
      errorMessage: 'Api createListingHandler error',
    });
  }
}
