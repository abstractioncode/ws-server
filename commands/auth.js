const typeorm = require("typeorm"); 

const User = require("./../modules/models/user").User;
const {makeback } = require("./../interface.js");
const {hwidcheck} = require("./../modules/services/account");
const {decrypt, encrypt} = require('./encryptest.js');

async function auth(msg,ws) {
  const connection = typeorm.getConnection();
  const userRepository = connection.getRepository(User);
  const user = await userRepository.findOne({
    where: {
        name: msg.username,
    },
    });
    
    if (user) {

        if(user.password == msg.password) {
        hwidcheck(user.name,msg,ws);
        }
        else 
        {
            ws.send(encrypt(JSON.stringify({
                uuid : msg.uuid,
                type : "pass_err",
                message : "wrong pass",
            })));
        }
    } else {
        ws.send(encrypt(JSON.stringify({
            uuid : msg.uuid,
            type : "acc_not_found",
            message : "account not found",
        })));
    }
}
module.exports = {
    auth: auth
}
