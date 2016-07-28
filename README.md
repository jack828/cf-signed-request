# cf-signed-request

CLI for signed requests to cf-api

[![build status](https://secure.travis-ci.org/jack828/cf-signed-request.svg)](http://travis-ci.org/jack828/cf-signed-request)
[![dependency status](https://david-dm.org/jack828/cf-signed-request.svg)](https://david-dm.org/jack828/cf-signed-request)

## Installation

```
npm install -g cf-signed-request
```

## Usage

```
    cf-req --api-key=KEY --api-id=ID --url=URL [options]
    cf-req --login [login-url]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    --api-key <key>      API key
    --api-id <id>        API ID
    --url <url>          URL
    --method [method]    Request method
    --login [login-url]  Login and get API key & ID
    -H, --header         HTTP header
    --compressed         Unsupported cURL command
    -o, --output <file>  Output to a file instead of stdout
```


###To login:
```
cf-req --login=[login-url]
```
The login url must be where the authentication happens, eg:
```
cf-req --login=http://localhost:3832/auth
```
This will ask for the users email and password, and returns the API key and ID.

###To perform requests:
```
cf-req --api-key=[api-key] --api-id=[api-id] --url=[api-url] [--method=[method] --H='header:info']
```
Will perform a request of the specified type (defaults to POST) to the specified URL and displays the body of the response.
Custom headers can be passed and will override any existing ones.
Currently does **not** support query string parameters.

## Credits
[Jack Burgess](https://github.com/jack828/)

## License

ISC
