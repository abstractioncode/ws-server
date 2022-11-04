class backend {
    constructor(username,user_id,secondary_group_ids,password,hwidId,hwididnew,subend,substart,cheats) {
        this.username = username;
        this.password = password;
        this.secondary_group_ids = secondary_group_ids;
        this.user_id = user_id;
        this.hwidId = hwidId;
        this.hwididnew = hwididnew;
        this.subend = subend;
        this.substart = substart;
        this.cheats = cheats;

    }
}
module.exports = {
    backend: backend
};
