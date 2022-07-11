class User {
    constructor(id, name,password,substart,subend,admin,hwidid,hwididnew,key) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.substart = substart;
        this.subend = subend;
        this.admin = admin;
        this.hwidid = hwidid;
        this.hwididnew = hwididnew;
        this.key = key;
    }
}
module.exports = {
    User: User
};