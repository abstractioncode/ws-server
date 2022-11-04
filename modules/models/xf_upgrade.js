class xf_user_upgrade_active {
    constructor(user_upgrade_record_id ,user_id ,purchase_request_key,user_upgrade_id ,extra,start_date ,end_date ,) {
        this.user_upgrade_record_id = user_upgrade_record_id;
        this.user_id = user_id;
        this.purchase_request_key = purchase_request_key;
        this.user_upgrade_id = user_upgrade_id;
        this.extra = extra;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}
module.exports = {
    xf_user_upgrade_active: xf_user_upgrade_active
};
