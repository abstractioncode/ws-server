const  {gettodayinunix,converttimestamptounix,converttimestamptodate} = require("./../dates/date");
const typeorm = require("typeorm"); 
const {decrypt, encrypt} = require('./../../commands/encryptest');
const cheats = require("./../cheats/cheats");
const backend = require("./../models/user").backend;
function generatespeckeyforuser() {
    let key = "";
    for(let i = 0; i < 32; i++) {
        key += Math.floor(Math.random() * 10);
    }
    return key;
}
const xf_user_upgrade_active = require("./../models/xf_upgrade").xf_user_upgrade_active;
const xf_user_group = require("./../models/xf_group").xf_user_group;
const xf_user_upgrade = require("./../models/xf_user_upgrade").xf_user_upgrade;
const {converttotimestamp,addtotimestampdays,convertfromtimestamp} = require("./../dates/date");
async function getusergroups(username)  {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(backend);
    const user = await userRepository.findOne({
      where: {
          username: username,
      },
      });
      if (user) {
        return user.secondary_group_ids;
      }
}
function howmanydaysbetweendates(start,end) {
    
    let days = (end - start) / (60 * 60 * 24);
    return days.toFixed(0);
}
var pack = function( arr ) {
    var length = arr.length,
        result = {},
        i;

    for ( i = 0; i < length; i++ ) {
        result[ ( i < 10 ? '0' : '' ) + ( i + 1 ) ] = arr[ i ];
    }

    return result;
};
async function authreturn(User,msg)
{
    const connection = typeorm.getConnection();
    const activeRep = connection.getRepository(xf_user_upgrade_active);
    const groupRep = connection.getRepository(xf_user_group);
    const upgradeRep = connection.getRepository(xf_user_upgrade);

    try{
        const active = activeRep.findOne({
            where: {
                user_id: User.user_id,
            }
        });

        let usergroups
        await getusergroups(User.username).then(function(groups) {
            usergroups = groups.toString().split(",");
        })
        console.log("secondory groups: " + usergroups)

        groupsids = [];

        for(const group of usergroups) {
            ids = await upgradeRep.findOne({
                where: {
                    extra_group_ids: group,
                }});
            if(ids) {
                groupsids.push(ids.user_upgrade_id);
            }
        }
        console.log(groupsids + "groupids sub")
        let info = {
            id: 0,
            name: "",
            till: ""
        }
        senddata = []

        for(const el in groupsids){
            const group = await activeRep.findOne({
                where: {
                    user_upgrade_id : groupsids[el],
                    user_id: User.user_id,
                }
            });
            if(group) {
                info.till = howmanydaysbetweendates(group.start_date,group.end_date );
          
            const name = await groupRep.findOne({
                where: {
                    user_group_id : usergroups[el],
                }})
            if(name) {
                info.name = name.title;
            }
            info.id = el;
            senddata.push({...info});
            } 
        }
            console.log(senddata)
        return {
            uuid : msg.uuid,
            type : "succauth",
            message : "user is valid && u have a sub",
            cheats : JSON.stringify(senddata),
            username: User.username,
            }
    } catch(e) {
        console.log(e);
    }
    
}
async function hwidcheck(username,msg,ws) {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(backend);
    const user = await userRepository.findOne({
      where: {
        username: username,
      },
      });
      const auth = await authreturn(user,msg);
      if(auth.username != undefined) {

            if(user.hwidId == msg.hwidid) {
                user.key = generatespeckeyforuser();
                userRepository.save(user);
                console.log(JSON.stringify(auth))
                ws.send(encrypt(JSON.stringify(auth)));

            }
            else if(user.hwidId == "") {
                user.hwidId = msg.hwidId;
                user.key = generatespeckeyforuser();

                userRepository.save(user);

                ws.send(encrypt(JSON.stringify(auth)));
            } else if (user.hwidId != msg.hwidid) {
                user.hwididnew = msg.hwidid;
                userRepository.save(user);

                ws.send(encrypt(JSON.stringify({
                    uuid : msg.uuid,
                    type : "hwid_err",
                    message : "wrong hwid",
                })));
            }
      }
      else {
        console.log("test5")

        ws.send(encrypt(JSON.stringify(auth)));
      }
}
async function takesub(username)  {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(backend);
    const user = await userRepository.findOne({
      where: {
          username: username
      },
      });
      if (user) {
        var today = new Date();
          
        user.substart = today;
        user.subend = convertfromtimestamp(addtotimestampdays(today,-30));
          userRepository.save(user);

      }
}
async function givesub(username,days)  {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(backend);
    const user = await userRepository.findOne({
      where: {
          username: username,
      },
      });
      if (user) {
          var today = new Date();
          
          user.substart = today;
          user.subend = convertfromtimestamp(addtotimestampdays(today,parseInt(days)));
          userRepository.save(user);

      }
}
async function resethwid(username)  {
    const connection = typeorm.getConnection();
    const userRepository = connection.getRepository(backend);
    const user = await userRepository.findOne({
      where: {
          username: username
      },
      });
      if (user) {
        user.hwidid = user.hwididnew;
        user.hwididnew = "";
        await userRepository.save(user);
        
      }
}
exports.resethwid = resethwid;
exports.givesub = givesub;
exports.takesub = takesub;
exports.authreturn = authreturn;
exports.hwidcheck = hwidcheck;
