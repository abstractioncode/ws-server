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

async function converttotimestamp(date) {
    return date.getTime();
}
async function addtotimestampdays(date,days)   {
    return converttotimestamp(new Date(date.getTime() + days*24*60*60*1000));
}
async function convertfromtimestamp(timestamp)  {
    return new Date(timestamp);
}
exports.gettodayinunix = gettodayinunix;
exports.converttimestamptounix = converttimestamptounix;
exports.converttimestamptodate = converttimestamptodate;
exports.converttotimestamp = converttotimestamp;
exports.addtotimestampdays = addtotimestampdays;
exports.convertfromtimestamp = convertfromtimestamp;