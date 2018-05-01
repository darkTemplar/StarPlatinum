import Api from '../lib/Api';

export default function api(req, res, next) {
  if (!req.api) {
    req.api = new Api();
  }

  next();
}
