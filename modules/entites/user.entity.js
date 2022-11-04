const { PrimaryColumn,QueryBuilder,ViewColumn,ViewEntity } = require("typeorm");

const EntitySchema = require("typeorm").EntitySchema; 
const backend = require("../models/user").backend; 

module.exports = new EntitySchema({
    name: "backend",
    synchronize: false,
    target: backend,
    columns: {
        user_id: {
            primary: true,
            type: "int",
        },
        username: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        password: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        hwidId: {
            type: "varchar",
            length: 255,
        },
        hwididnew: {
            type: "varchar",
            length: 255,
            nullable: true
        },
        secondary_group_ids: {
            type: "varbinary",
            length: 255,
            nullable: false
        },
    },
    
});
