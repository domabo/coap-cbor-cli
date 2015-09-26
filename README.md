CoAP-CBOR-CLI
============================

__CoAP-CBOR-CLI__ is a command line interface for CoAP, built on node.js,
[node-coap](http://github.com/mcollina/node-coap) and [cbor](https://www.npmjs.com/package/cbor)

What is CoAP?
----------------------------

> Constrained Application Protocol (CoAP) is a software protocol
intended to be used in very simple electronics devices that allows them
to communicate interactively over the Internet. -  Wikipedia

What is CBOR?
----------------------------

> Concise Binary Object Representation (CBOR) data format (RFC7049)


Install
----------------------------

Install [node.js](http://nodejs.org), and then from a terminal:
```
npm install coap-cbor-cli -g
```

Usage
----------------------------

```
  Usage: coap [command] [options] url

  Commands:

    get                    performs a GET request
    put                    performs a PUT request
    post                   performs a POST request
    delete                 performs a DELETE request

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -o, --observe            Observe the given resource
    -c, --cbor               Encode and decode the packet using CBOR
    -p, --payload <payload>  The payload for POST and PUT requests
    -q, --quiet              Do not print status codes of received packets
```

### PUT and POST

__PUT__ and __POST__ requests body are sent from the standard
input by default. E.g.
```
echo -n 'hello world' | coap post coap://localhost/message
```

If you want to type it you can end the standard input by pressing
CTRL-D.

License
----------------------------

Copyright (c) 2015 Domabo
Forked from coap-cli, original author Matteo Collina

coap-cbor-cli is licensed under an MIT +no-false-attribs license.
coap-cli is licensed under an MIT +no-false-attribs license.
All rights not explicitly granted in the MIT license are reserved.
See the included LICENSE file and THIRDPARTY file for more details.
