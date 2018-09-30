const fs = require('fs')
const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
const cmds = client.commands.filter(cmd => cmd.info.ownerOnly !== true)
let categories = fs.readdirSync('./commands/');
let commands = {}
categories.forEach(cat => {
  commands[cat] = []})
cmds.array().forEach(c => {
commands[c.info.category].push(`**•** ${c.info.aliases[0]} | ${c.info.info}`)
})
let embed = new Discord.RichEmbed()
.setTitle('Help Command:')
categories.forEach(cat => {if(!commands[cat][0]) return; embed.addField(cat, commands[cat].join('\n'))})
message.channel.send(embed)
    },
    info: {
        ownerOnly: false,
        aliases: ["help"],
        example: "help",
        info: "sends this message"
          }
}
