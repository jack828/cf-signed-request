'use strict'
const crypto = require('crypto')

module.exports = function sign (apiKey, method, contentType, date, uri, ttl) {
  if (apiKey === undefined) throw new Error('apiKey is required')
  if (method === undefined) throw new Error('method is required')
  if (uri === undefined) throw new Error('uri is required')
  let hmac = crypto.createHmac('sha1', apiKey)
    , uriNormalized = normalize(uri)
    , packet = method + '\n' + contentType + '\n' + date + '\n' + uriNormalized

  if (ttl) packet += '\n' + ttl
  return hmac.update(packet).digest('base64')
}

function normalize (uri) {
  return uri.replace(/\+/g, '%20').replace(/\'/g, '%27')
}
