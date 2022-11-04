const { PrimaryColumn,QueryBuilder,ViewColumn,ViewEntity } = require("typeorm");

const EntitySchema = require("typeorm").EntitySchema; 
const xf_user_group = require("../models/xf_group").xf_user_group; 

module.exports = new EntitySchema({
    name: "xf_user_group",
    synchronize: false,
    target: xf_user_group,
    columns: {
        user_group_id: {
            primary: true,
            type: "int",
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false
        }
    }
});
