export default function currentUser(req, res, next) {
  req.api.get('getCurrentUser')
    .then(({ user }) => {
      req.user = user;
      next();
    }, (error) => {
      console.log(error);
      next();
    });
}
