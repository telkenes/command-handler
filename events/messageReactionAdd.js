module.exports = {
    run: async (client, reaction, user) => {
        if (user.bot) return
        if (reaction.emoji.name === '🗑' && reaction.message.author.id === client.user.id && user.id === client.config.ownerID) return reaction.message.delete()
    }}
