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

  try {
    res.json({
      sqft,
      bedrooms,
      bathrooms,
      lot,
      photos,
      disclosures,
      shareDisclosure,
    });
  } catch (ex) {
    console.error(ex.message);

    res.status(500).json({
      errorMessage: 'Api createListingHandler error',
    });
  }
}
