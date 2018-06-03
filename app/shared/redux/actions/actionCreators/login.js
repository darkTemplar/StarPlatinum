export default function signIn({
  email,
  password,
  firstName,
}) {
  if (!email || !password || !firstName) {

  }

  return (
    post(AUTH_ENDPOINT, {
      body: ,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => dispatch(createListingError(ex.message)));
  );
}
