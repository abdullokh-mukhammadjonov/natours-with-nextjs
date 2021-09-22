import errorHandler from './errorHandler'


export const ncOpts = {
  onError(err, req, res, next) {
    errorHandler(err, req, res);
  },
  onNoMatch: function onNoMatch(req, res) {
    res.status(404).end("page is not found... or is it");
  }
};
