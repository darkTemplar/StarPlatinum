export default function createListingHandler(req, res) {
  debugger
  const {
    body: {
      sqft,
      bedrooms,
      bathrooms,
      lot,
    },
  } = req;

  try {
    res.json({
      sqft,
      bedrooms,
      bathrooms,
      lot,
    });
  } catch (ex) {
    console.error(ex.message);

    res.status(500).json({
      errorMessage: 'Api createListingHandler error',
    });
  }
}
