
const { PrimaryColumn,QueryBuilder,ViewColumn,ViewEntity } = require("typeorm");

const EntitySchema = require("typeorm").EntitySchema; 
const xf_user_upgrade = require("./../models/xf_user_upgrade").xf_user_upgrade;
module.exports = new EntitySchema({
    name: "xf_user_upgrade",
    synchronize: false,
    target: xf_user_upgrade,
    columns: {
        user_upgrade_id : {
            type: "int",
            primary: true,
        },
        extra_group_ids : {
            type: "varbinary",
            length: 255,
            nullable: false
        },
    }
});
