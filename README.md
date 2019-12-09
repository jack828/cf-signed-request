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
    --method <method>    Request method
    --login <login-url>  Login and get API key & ID
    -H, --header         HTTP header
    --compressed         Unsupported cURL command
    -o, --output <file>  Output to a file instead of stdout
    -d, --data <data>    POST data
    --hash <type>        Hash function to use. Defaults to SHA-1
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
cf-req --api-key=[api-key] --api-id=[api-id] --url=[api-url] [options]
```
Will perform a request of the specified type (defaults to GET) to the specified URL and displays the body of the response.
Custom headers can be passed and will override any existing ones.

##Arguments

| Argument | Usage | Example|
|----------|-------|--------|
|```-h, --help```| Display help |```cf-req -h```|
|```-V, --version```| Display version |```cf-req -V```|
|```--api-key <key>```| The API key |See ```--url```|
|```--api-id <id>```| The API ID |See ```--url```|
|```--url <url>```| The API url<br>Must include protocol |```cf-req --api-key XYZ --api-id ABC --url http://localhost:3832/api```|
|```--login <url>```| The URL where user credentials are authenticated and API key/ID is returned.<br>Credentials are given in a friendly copy-paste format.| ```cf-req --login http://localhost:3831/auth``` |
| ```-H, --header '<header>'``` | Supply additional headers.<br>Multiple headers may eb given, and will override application defaults. | ```cf-req --api-key XYZ --api-id ABC --url http://localhost:3832/api -H 'cf-keep-data:true'``` |
|--hash <type>``` | The hash function to use, defaults to sha1. | ```cf-req --login=http://localhost:3832/auth --hash sha256``` |

## Credits
[Jack Burgess](https://github.com/jack828/)

## License

ISC
