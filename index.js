#! /usr/bin/env node

var program = require('commander')
  , version = require('./package').version
  , request = require('coap').request
  , URL     = require('url')
  , method  = 'GET' // default
  , util = require('util')
  , url
  , cbor = require('cbor')
 
program
  .version(version)
  .option('-c, --cbor', 'Encode/decode the payload with CBOR', 'boolean', false)
  .option('-o, --observe', 'Observe the given resource', 'boolean', false)
  .option('-p, --payload <payload>', 'The payload for POST and PUT requests')
  .option('-q, --quiet', 'Do not print status codes of received packets', 'boolean', false)
  .usage('[command] [options] url')


;['GET', 'PUT', 'POST', 'DELETE'].forEach(function(name) {
  program
    .command(name.toLowerCase())
    .description('performs a ' + name + ' request')
    .action(function() { method = name })
})

program.parse(process.argv)

if (!program.args[0]) {
  program.outputHelp()
  process.exit(-1)
}

url = URL.parse(program.args[0])
url.method = method
url.observe = program.observe

if (url.protocol !== 'coap:' || !url.hostname) {
  console.log('Wrong URL. Protocol is not coap or no hostname found.')
  process.exit(-1)
}

req = request(url).on('response', function(res) {
  
  if (!res.payload.length && !program.quiet)
    process.stderr.write('\x1b[1m(' + res.code + ')\x1b[0m\n')
    
   
   if (program.cbor){   
       var d = new cbor.Decoder();
  
        d.on('complete', function(obj){
          console.log(util.inspect(obj,{ depth: null }));
      });
    
      res.pipe(d);
   } else
   {
     res.pipe(process.stdout);
   }

   if (!res.payload.length)
    process.exit(0) 
})

if (method === 'GET' || method === 'DELETE' || program.payload) {
  
   if (program.cbor)
       req.end(cbor.encode(program.payload))
    else
       req.end(program.payload);
       
   return
}

 if (program.cbor)
 {
     var e = new cbor.Encoder();
     process.stdin.pipe(e).pipe(req);
 }
 else
     process.stdin.pipe(req)
