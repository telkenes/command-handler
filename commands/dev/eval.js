module.exports = {
    run: async (client, message, args) => {
let slient = false;
let content = args.join(" ")
if (content.endsWith('--slient')) {
    content = content.replace('--slient', '')
    slient = true
}
const result = new Promise((resolve, reject) => {
  try {
    let res = eval(content)
    resolve(res)
} catch (e) {
  resolve(e.message)
}
})
if (slient === false) {
let msg = await message.channel.send('Evaluating. . .')
return result.then(output => {
 if (typeof output !== 'string') output = require('util').inspect(output, {
 depth: 0
 });
 if (output.includes(client.token)) output = output.replace(client.token, client.faketoken);
 if (output.length > 1990) console.log(output), output = 'Too long to be printed (content got console logged)';
 msg.react('🗑')
 return msg.edit(output, {code: 'js'});

}).catch(err => {
 err = `${err.toString()}`;

 if (err.includes(client.token)) err = err.replace(client.token, client.faketoken);

  msg.edit(err, {code: 'js'});

});
}
    },
    info: {
        ownerOnly: true,
        aliases: ["eval", "ev", "exec"],
        example: "eval",
        info: "evaluates ur stuff"
    }
}
