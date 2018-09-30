module.exports = {
    run: async (client, message, args) => {
      let commandName = args.join(' ')
        if (!args[0]) return message.channel.send('\\❌ Please provide a command name to reload.');
        if(!client.commands.has(commandName)) return message.channel.send('\\❌ Invalid command;');
        let cmd = client.commands.get(commandName).info
        if (!cmd.category) return
        delete require.cache[require.resolve(`../../commands/${cmd.category}/${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`../../commands/${cmd.category}/${commandName}.js`);
  props.info.category = cmd.category
  client.commands.set(commandName, props);
  message.reply(`The command ${commandName} has been reloaded`)
    },
    info: {
        ownerOnly: true,
        aliases: ["reload", "rl"],
        example: "reload",
        info: "reloads a command"
          }
}
