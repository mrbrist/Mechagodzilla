//Imports
const {
  CommandoClient
} = require('discord.js-commando');
const path = require('path');
const settings = require('./settings.json')

// Music Queue
module.exports.queue = {};
module.exports.players = {};

// Setup the Client
const client = new CommandoClient({
  commandPrefix: settings.commandPrefix,
  unknownCommandResponse: false,
  owner: settings.ownerID,
  disableEveryone: true
});

// Register command groups
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['mod', 'Moderation commands'],
    ['music', 'Music commands'],
    ['everyone', 'Commands for everyone']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

// Run this when the client is ready
client.on('ready', () => {
  console.log('Logged in!');
  client.user.setActivity('.help');
});

// Log all messages to the log channel
client.on('message', message => {
  const guild = client.guilds.find('name', 'Minor Annoyance');
  const logChnl = guild.channels.find('name', 'chat-log')
  var u = message.content.match(/(<@.[0-9]+>)/g)
  if (u !== null) {
    for (var i = 0; i < u.length; i++) {
      var parse = u[i].replace(/[<@!>]/g, "")
      if (message.mentions.users.has(parse)) {
        var user = message.mentions.users.get(parse)
        var username = `${user.username}#${user.discriminator}`

        message.content = message.content.replace(u[i], username)
        console.log(username);
      }
    }
  }
  var chanName = message.channel.name
  function NOW() {
    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);
    if (gg < 10)
      gg = "0" + gg;
    if (mm < 10)
      mm = "0" + mm;
    var cur_day = aaaa + "-" + mm + "-" + gg;
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();
    if (hours < 10)
      hours = "0" + hours;
    if (minutes < 10)
      minutes = "0" + minutes;
    if (seconds < 10)
      seconds = "0" + seconds;
    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
  }
  if (!message.author.bot && client.guilds.find('name', 'Minor Annoyance').id == message.guild.id) {
    if (message.attachments.first() != null) {
      logChnl.send(`\`\`\` <${NOW()}> | ${message.author.username}#${message.author.discriminator} @ #${chanName}: ${message.attachments.first().url} \`\`\``)
    } else {
      logChnl.send(`\`\`\` <${NOW()}> | ${message.author.username}#${message.author.discriminator} @ #${chanName}: ${message.content} \`\`\``)
    }
  }
});

// Log the client in
client.login(settings.clientSecret);
// console.log(settings.clientSecret);
