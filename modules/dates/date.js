function gettodayinunix() {
    var today = new Date();
    return today.getTime();
}
function converttimestamptounix(timestamp) {
    var date = new Date(timestamp);
    return date.getTime();
}
function converttimestamptodate(timestamp) {
    var date = new Date(timestamp);
    return date;
}
exports.gettodayinunix = gettodayinunix;
exports.converttimestamptounix = converttimestamptounix;
exports.converttimestamptodate = converttimestamptodate;