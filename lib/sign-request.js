'use strict'
const createSignature = require('./createSignature')

module.exports = function signRequest (host, req, auth) {

  let contentType = ([ 'GET', 'DELETE' ].indexOf(req.method) !== -1 ? '' : 'application/json')
    , date = (new Date()).toUTCString()
    , signature = createSignature(auth.key, req.method, contentType, date, req.url)
  console.log(auth.key, req.method, contentType, date, req.url)
  req.headers = req.headers || {}
  req.headers['Authorization'] = 'Catfish ' + auth.id + ':' + signature
  req.headers['x-cf-date'] = date
  req.headers['Accept'] = 'application/json'
  if (contentType) req.headers['Content-Type'] = contentType
  req.url = host + req.url

  return req
}
