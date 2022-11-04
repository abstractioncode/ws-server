class xf_user_upgrade {
    constructor(user_upgrade_id,extra_group_ids) {
        this.user_upgrade_id = user_upgrade_id;
        this.extra_group_ids = extra_group_ids;
    }
}
module.exports = {
    xf_user_upgrade: xf_user_upgrade
};