var Discord = require('discord.js')
module.exports = {
    run: async (client, message, args, conf) => {
        message.channel.send("<a:loading:413599416138858506> Pinging...").then(ping => {
            const embed=new Discord.RichEmbed().setDescription(`\n:ping_pong: Bot Ping: ${ping.createdTimestamp - message.createdTimestamp}ms\n:watch: DiscordAPI Ping: ${Math.round(client.ping)}ms`).setFooter(`Requested by ${message.author.username}`,message.author.displayAvatarURL).setColor(0x026dd1)
            ping.edit(embed);
          });
    },
    info: {
        ownerOnly: false,
        aliases: ["ping"],
        example: "ping",
        info: "sends the ping of the bot"
    }
}
