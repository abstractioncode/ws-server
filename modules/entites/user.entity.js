const EntitySchema = require("typeorm").EntitySchema; 
const User = require("../models/user").User; 

module.exports = new EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        password: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        substart: {
            type: "timestamp",
            nullable: true
        },
        subend: {
            type: "timestamp",
            nullable: true
        },
        admin: {
            type: "boolean",
            default: false
        },
        hwidid: {
            type: "varchar",
            length: 255,
        },
        hwididnew: {
            type: "varchar",
            length: 255,
            nullable: true
        },
        key: {
            type: "varchar",
            length: 255,
            nullable: true
        }
    }
});