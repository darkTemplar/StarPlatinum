export default function signIn() {
  return (
    post(CREATE_LISTING_API_ENDPOINT, {
      body: listing,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => dispatch(createListingError(ex.message)));
  );
}
