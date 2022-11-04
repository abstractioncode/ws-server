const typeorm = require("typeorm"); 

const backend = require("./../modules/models/user").backend;
const {makeback } = require("./../interface.js");
const {hwidcheck} = require("./../modules/services/account");
const {decrypt, encrypt} = require('./encryptest.js');
const bcrypt = require("bcrypt");

async function validatecreditials(password,passworddb) {
    return bcrypt.compareSync(password, passworddb);
  }
async function auth(msg,ws) {
  const connection = typeorm.getConnection();
  const userRepository = connection.getRepository(backend);
  const user = await userRepository.findOne({
    where: {
        username: msg.username,
    },
    });
    
    if (user) {
        console.log(user)
        if (validatecreditials(msg.password,user.password.toString())) {
        hwidcheck(user.username,msg,ws);
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
