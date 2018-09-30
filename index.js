//discord client
const { Client } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ disableEveryone: true});
const fs = require('fs')
const fetch = require('node-fetch')
client.config = require('./config.json');
//rainbow color for embed maybe will use
client.colors = [0xcc0000, 0xcc3300, 0xcc6600, 0xcc9900, 0xcccc00, 0x99cc00, 0x66cc00, 0x33cc00, 0x00cc00, 0x00cc33, 0x00cc66, 0x00cc99, 0x00cccc, 0x0099cc, 0x0066cc, 0x0033cc, 0x0000cc, 0x3300cc, 0x6600cc, 0x9900cc, 0xcc00cc, 0xcc0099, 0xcc0066, 0xcc0033];

client.login(client.config.token);

require("./util/functions.js")(client);

let categories = fs.readdirSync('./commands/');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
categories.forEach(async (category) => {
  fs.readdir(`./commands/${category}/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let commandname = file.replace('.js', '')
      let command = require(`./commands/${category}/${file}`);
      command.info.category = category
      client.commands.set(commandname, command);
      command.info.aliases.forEach(cmdname => {
         client.aliases.set(cmdname, commandname);
      })
    });
  });


})




exports.client = client;

fs.readdir('./events', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (file.split('.').pop() != "js") return;
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
