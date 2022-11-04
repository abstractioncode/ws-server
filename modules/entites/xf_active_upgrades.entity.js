const { PrimaryColumn,QueryBuilder,ViewColumn,ViewEntity } = require("typeorm");

const EntitySchema = require("typeorm").EntitySchema; 
const xf_user_upgrade_active = require("../models/xf_upgrade").xf_user_upgrade_active; 

module.exports = new EntitySchema({
    name: "xf_user_upgrade_active",
    synchronize: false,
    target: xf_user_upgrade_active,
    columns: {
        user_upgrade_record_id: {
            primary: true,
            type: "int",
        },
        user_id: {
            primary: true,
            type: "int",
        },
        purchase_request_key: {
            type: "varbinary",
            length: 255,
            nullable: false
        },
        user_upgrade_id: {
            type: "int",
            nullable: false
        },
        extra: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        start_date: {
            type: "int",
            nullable: false
        },
        end_date: {
            type: "int",
            nullable: false
        }
    }
});
