const {typedownload} = require('./commands/download.js')
const {auth} = require('./commands/auth.js')
const {getme} = require('./commands/encryptest.js')
function getcommand(msg,ws) {
    switch (msg.type) {
      case 'auth':
        auth(msg,ws);
        console.log("got it")
        break;
      case 'download':
        typedownload(msg,ws)
        break;
      case 'decrypt':
        getme(msg,ws);
      default:
        console.log("get out from here")
        break;
    }
}
exports.getcommand = getcommand;