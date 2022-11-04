const { Repository } = require("typeorm");
const typeorm = require("typeorm");
const {auth} = require("./../commands/auth.js");
const { backend } = require("./models/user");
async function checkiftableexist(table) {
    const connection = typeorm.getConnection();
  try {
    connection.query("DROP VIEW IF EXISTS backend");
    connection.query("CREATE VIEW backend AS select `xenforo`.`xf_user`.`username` AS `username`,`xenforo`.`xf_user`.`secondary_group_ids` AS `secondary_group_ids`,`xenforo`.`xf_user`.`user_id` AS `user_id`,substr(`xenforo`.`xf_user_authenticate`.`data`,23,60) AS `password`,`xenforo`.`xf_user`.`hwidid` AS `hwidId`,`xenforo`.`xf_user`.`hwididnew` AS `hwididnew`,`xenforo`.`xf_user`.`subend` AS `subend`,`xenforo`.`xf_user`.`cheats` AS `cheats`,`xenforo`.`xf_user`.`substart` AS `substart` from (`xenforo`.`xf_user` join `xenforo`.`xf_user_authenticate` on((`xenforo`.`xf_user`.`user_id` = `xenforo`.`xf_user_authenticate`.`user_id`)))");
  } catch (error) {
    console.log(error);
  }
}
function setup()
{
    return new Promise((resolve,reject) => {
        
    typeorm.createConnection({
        type: "mysql",
        host: "65.21.193.168",
        port: 3306,
        username: "xenforo",
        password: "GCtAmxbKDa3JLK4j",
        database: "xenforo",
        entities: [
          require("./entites/user.entity"),
          require("./entites/xf_user_group.entity"),
            require("./entites/xf_active_upgrades.entity"),
            require("./entites/xf_user_upgrade.entity"),
        ],
        synchronize: true,
    }).then(connection => {
        resolve();
        
        checkiftableexist("backend")
    }
    ).catch(error => {
        console.log("Error: " + error);
    })
    })
}
exports.setup = setup;