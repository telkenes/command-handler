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
    },
    client.parseTime = function(ms) {
      let seconds = Math.floor(ms/1000); milliseconds %= 1000;
  let minutes = Math.floor(seconds/60); seconds %= 60;
  let hours = Math.floor(minutes/60); minutes %= 60;
  let days = Math.floor(hours/24); hours %= 24;
  let written = false;
  return (days?(written=true,days+" d"):"")+(written?", ":"")
      +(hours?(written=true,hours+" h"):"")+(written?", ":"")
      +(minutes?(written=true,minutes+" m"):"")+(written?", ":"")
      +(seconds?(written=true,seconds+" s"):"")+(written?", ":"")
      +(ms?ms+" ms":"");
    }    
}
