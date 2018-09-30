const Discord = require('discord.js')
module.exports = {
    run: async (client, message, args) => {
        var cat = await client.get('https://some-random-api.ml/catimg')
        message.channel.send({ files: [cat.link] })
    },
    info: {
        ownerOnly: false,
        aliases: ["cat", "cutecat", "cute-cat"],
        example: "cat",
        info: "sends a random image of a cat"
    }
}
