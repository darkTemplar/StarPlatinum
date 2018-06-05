export default function login({
  email,
  password,
  firstName,
}) {
  if (!email || !password || !firstName) {
    throw new Error('Must not be missing fields required for sign up ');
  }

  return (
    post(AUTH_ENDPOINT, {
    })
      .then((response) => {
        console.log(response);
      })
      .catch((ex) => dispatch(createListingError(ex.message)));
  );
}
