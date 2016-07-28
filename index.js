#! /usr/bin/env node
'use strict'

const signRequest = require('./lib/sign-request')
    , pkg = require('./package.json')
    , program = require('commander')
    , request = require('request')
    , URL = require('url')
    , prompt = require('prompt')
    , headers = [ ]
    , schema = {
      properties: {
        email: {
          description: 'Email'
        , required: true
        }
      , password: {
          description: 'Password'
        , hidden: true
        , replace: '*'
        }
      }
    }

function collect (val, list) {
  list.push(val)
  return list
}

prompt.message = ''

program
  .usage('--api-key=KEY --api-id=ID --url=URL [options]')
  .version(pkg.version)
  .option('--api-key <key>', 'API key')
  .option('--api-id <id>', 'API ID')
  .option('--url <url>', 'URL')
  .option('--method <method>', 'Request method')
  .option('-H, --header <header>', 'HTTP header', collect, headers)
  .option('--login <login-url>', 'Login and get API key & ID')
  .option('--compressed', 'Unsupported cURL command')
  .option('-o, --output <file>', 'Output to a file instead of stdout')
  .option('-d, --data <data>', 'POST data')
  .parse(process.argv)

if (program.login) {
  if (typeof program.login !== 'string') throw Error('URL required')
  prompt.get(schema, function (err, data) {
    if (err) throw err
    let req = {
        uri: program.login
      , body: {
          identity: data.email
        , password: data.password
      }
      , json: true
    }
    request.post(req, function (err, res, body) {
      if (err) throw err
      switch (+res.statusCode) {
      case 200:
        console.log('Your API key is:', body.key)
        console.log('Your API ID is:', body.id)
        console.log('CLI shortcut:')
        console.log('--api-key=%s --api-id=%s', body.key, body.id)
        break
      case 401:
        console.log('Unauthorised.')
        console.log('Wrong email and/or password.')
        break
      default:
        throw new Error('Api error: ' + res)
      }
    })
  })
} else {
  let parsedURL = URL.parse(program.url)
  , hostname = parsedURL.protocol + '//' + parsedURL.host
  , auth = { id: program.apiId, key: program.apiKey }
  , req
  , method
  , formattedHeaders = { 'User-Agent': `${pkg.name}/${pkg.version}` }
  if (!program.url) throw Error('URL required')
  if (!program.apiKey) throw Error('API key required')
  if (!program.apiId) throw Error('API ID required')
  if (['PUT', 'POST', 'DELETE'].indexOf(program.method) === -1) method = 'GET'

  // console.log(program)
  headers.forEach((header) => {
    let headerSplit = header.split(':')
      , key = headerSplit[0]
      , value = headerSplit.slice(1).join(':')
    formattedHeaders[key] = value
  })
  req = {
      url: parsedURL.pathname
    , method: program.method || method
    , headers: formattedHeaders
    , body: program.data || ''
  }

  request(signRequest(hostname, req, auth), function (err, res, body) {
    if (err) throw err
    if (res.statusCode !== 200) throw new Error('Api error: ' + body)

    console.log(body)
  })

}
