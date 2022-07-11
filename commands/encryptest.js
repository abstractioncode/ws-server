'strict'
const {makeback} = require('./../interface.js');
const CryptoJS = require('crypto-js');
const Crypto = require('crypto');

const word = "meuteste";

let key = "12345678901234567890123456789012";
key = CryptoJS.enc.Utf8.parse(key);

let iv = "1234567890123456";
iv = CryptoJS.enc.Utf8.parse(iv);

function encrypt(text)
{
    let aes256 = CryptoJS.AES.encrypt(text, key, {iv: iv,
        mode: CryptoJS.mode.CBC});

    return aes256.toString();
}

function decrypt(text)
{
    let aes256 = CryptoJS.AES.decrypt(text, key, {iv: iv,
        mode: CryptoJS.mode.CBC});
        return aes256.toString(CryptoJS.enc.Utf8);
}
async function getme(msg,ws) {
    let object = {
        uuid : msg.uuid,
        type : "decrypt",
        message : "pidr",
    }
   ws.send(encrypt(JSON.stringify(object)).toString());
}
exports.getme = getme;
exports.encrypt = encrypt;
exports.decrypt = decrypt;