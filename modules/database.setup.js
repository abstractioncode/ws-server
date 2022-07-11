const typeorm = require("typeorm");
const User = require("./models/user").User; // import {Post} from "./model/Post";
const {auth} = require("./../commands/auth.js");
function setup()
{
    typeorm.createConnection({
        type: "mysql",
        host: "",
        port: 3306,
        username: "",
        password: "",
        database: "",
        entities: [
          require("./entites/user.entity"),
        ],
        synchronize: true,
    }).then(connection => {
        console.log("Connected to database");
        
    }
    ).catch(error => {
        console.log("Error: " + error);
    })
}
exports.setup = setup;