const fs = require('fs');

module.exports = {
    run: async (client, message) => {
        if (message.author.bot || !message.guild) return;
        let mention = new RegExp(`^<@!?${client.user.id}> `)

        let prefix = message.content.match(mention) ? message.content.match(mention)[0] : client.config.prefix
       if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            if (!cmd) return;
            try {
                if (cmd.info.ownerOnly === true && message.author.id !== client.config.ownerID) return
                cmd.run(client, message, args);
            }
            catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        }
        }
    }
