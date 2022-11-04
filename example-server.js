var WebSocketServer = require('ws').Server;
var http = require('http');
const fs = require('fs');
var server = http.createServer({

});
var wss = new WebSocketServer({server: server, path: '/foo',
});
const typeorm = require("typeorm");
const backend = require("./modules/models/user").backend;
const {getcommand} = require('./commandhandler.js');
const {setup} = require('./modules/database.setup.js');

setup().then( () => {
    console.log("database setup done");
}
).catch(err => {
    console.log("database setup error");
});
const {decrypt, encrypt} = require('./commands/encryptest.js');
const {main} = require('./modules/commands/inputhandler.js');
wss.on('connection', function(ws) {
    console.log('/foo connected');
    ws.send(encrypt(JSON.stringify({
        uuid : "13367",
        type : "csgo",
        message : "i see u are injecting the cheat :)",
    })));

    ws.on('message', function(data, flags) {
      //console.log(data)
      const msg = JSON.parse(decrypt(data));
       // console.log(msg)
          getcommand(msg,ws);
        //ws.send("123");
    });
    ws.on('close', function() {
      console.log('Connection closed!');
    });
    ws.on('error', function(e) {
    });
    
});
server.listen(8126, () => {
  console.log('listening on port 8126');
});
main();
