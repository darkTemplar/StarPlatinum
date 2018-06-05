export default function currentUser(req, res, next) {
  req.api.get('getCurrentUser', { headers: { cookie: req.headers.cookie } })
    .then(
      response => response.json(),
      (error) => {
        console.error(error);
        next();
      },
    )
    .then(({ user }) => {
      req.user = user;
      next();
    });
}
