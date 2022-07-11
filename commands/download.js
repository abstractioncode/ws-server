const fs = require('fs');
const typeorm = require("typeorm"); 
const User = require("./../modules/models/user").User;

const {makeback} = require('./../interface.js');

async function typedownload(msg,ws,key) {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            name: msg.username,
        },
    })
    if(user.key == key) {
    const buf = fs.readFileSync('123.txt');
      makeback.uuid = msg.uuid;
      makeback.type = "download";
      makeback.message = buf.toString('hex')
      ws.send(JSON.stringify(makeback));
    }
}
exports.typedownload = typedownload;