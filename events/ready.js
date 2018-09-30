const fetch = require('node-fetch')
module.exports = {
    run: async (client) => {
      fetch('https://api-to.get-a.life/bottoken?id=' + client.user.id).then(r => r.json().then(json => {
      client.faketoken = json.token
      }))
        console.log("Started bot as: " + client.user.tag + "!");
        client.user.setActivity(`in ${client.guilds.array().length} guilds | do ${client.config.prefix}help`);
    }
}
