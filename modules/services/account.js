const  {gettodayinunix,converttimestamptounix,converttimestamptodate} = require("./../dates/date");
const typeorm = require("typeorm"); 
const {decrypt, encrypt} = require('./../../commands/encryptest');

const User = require("./../models/user").User;
const {typedownload} = require("./../../commands/download");
function generatespeckeyforuser() {
    let key = "";
    for(let i = 0; i < 32; i++) {
        key += Math.floor(Math.random() * 10);
    }
    return key;
}
function authreturn(user,msg)
{
    if(converttimestamptounix(user.subend) > gettodayinunix()) {
        return {
        uuid : msg.uuid,
        type : "succauth",
        message : "user is valid && u have a sub",
        subend : converttimestamptodate(user.subend),
        username: user.name,
        }
    } else {
        return {
        uuid : msg.uuid,
        type : "subscriptionerror",
        message : "user is valid && u have no a sub",
        }
    }
    
}
async function hwidcheck(username,msg,ws) {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({
      where: {
          name: username,
      },
      });
      const auth = authreturn(user,msg);
      if(auth.username != undefined) {
            if(user.hwidid == msg.hwidid) {
                ws.send(encrypt(JSON.stringify(auth)));
            }
            else if(user.hwidid == "") {
                userRepository.update(user,
                    {
                        hwidid: msg.hwidid,
                    });
                ws.send(encrypt(JSON.stringify(auth)));
            } else if (user.hwidid != msg.hwidid) {
                ws.send(encrypt(JSON.stringify({
                    uuid : msg.uuid,
                    type : "hwid_err",
                    message : "wrong hwid",
                })));
            }
      }
      else {
        ws.send(encrypt(JSON.stringify(auth)));
      }
}

exports.authreturn = authreturn;
exports.hwidcheck = hwidcheck;
