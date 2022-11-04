const prompts = require('prompts');
const commands = [ "help","reset","givesub","takesub"]
const {takesub,givesub,resethwid} = require('../services/account.js');

async function main() {
  var works = true;
  while (works) {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'Enter a command',
      validate: value => value.length > 0 ? true : 'Please enter a command',
    });
    if (response.value == "help") {
      console.log("commands: " + commands.join(", "));
    }
    if(response.value == "givesub") {
      const response = await prompts({
        type: 'text',
        message: 'Enter a username' ,
        validate: value => value.length > 0 ? true : 'You must enter a username'
      });
      const details = {
        username: response.undefined,
        days: null,
      }
      const response2 = await prompts({
        type: 'text',
        message: 'Enter a number of days',
        validate: value => value.length > 0 ? true : 'You must enter a number of days',
      });
      details.days = response2.undefined;
      console.log();
      givesub(details.username,details.days);
      console.log("u gave a subscription to " + details.username + " succesfully");

      }
    if(response.value == "takesub") {
      const response = await prompts({
        type: 'text',
        message: 'Enter a username',
        validate: value => value.length > 0 ? true : 'You must enter a username'
      });
      takesub(response.message);
      console.log("u take  a subscription from " + response.message + " succesfully");

    }
    if (response.value == "reset") {
      
      const response = await prompts({
        type: 'text',
        message: 'Enter a username',
        validate: value => value.length > 0 ? true : 'You must enter a username'
      });
      resethwid(response.message);
      console.log("hwid for user " + response.message + " reseted"); 

    }
  }
}
exports.main = main;