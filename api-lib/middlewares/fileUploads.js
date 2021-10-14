import multiparty from 'multiparty'
export default async function (req, res, next) {
  // enable file uploads
  const form = new multiparty.Form()

  await form.parse(req, function (err, fields, files) {
    req.body = fields
    req.files = files
    next()
  })
}