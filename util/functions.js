const fetch = require('node-fetch')

module.exports = (client) => {
    client.reverseObj = function(object) {
        var NewObj = {}, keysArr = Object.entries(object);
        for (var i = 0; i < keysArr.length; i++) {
            NewObj[keysArr[i][1]] = keysArr[i][0];
        }
        return NewObj
    },
    client.parseEmoji = function (emoji) {
        let type, e;
        e = Discord.Util.parseEmoji(emoji);
        if (e == null) return null;
        if (e.id == undefined) return null;
        if (e.animated) type = "gif";
        else type = "png";
        return { animated: e.animated, name: e.name, id: e.id, url: `https://cdn.discordapp.com/emojis/${e.id}.${type}` };
    },
    client.get = function(link) {
        return new Promise(async (resolve, reject) => {
        fetch(link).then(r => r.json().then(json => resolve(json)))
    })
    }
}
