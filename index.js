//Imports
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const settings = require('./settings.json')

// Music Queue
module.exports.queue = {};
module.exports.players = { '459047097547882518': { ow: [ 'Brist#3703','Brist#3703','Brist#3703','Brist#3703','Brist#3703','Brist#3703','Brist#3703' ] } };

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
  const guild = client.guilds.find('name','Minor Annoyance');
  const logChnl = guild.channels.find('name','chat-log')
  var chanName = message.channel.name
  var d = new Date(message.createdAt);
  d = new Date(d.getTime() - 3000000);
  var date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
  if (!message.author.bot && client.guilds.find('name','Minor Annoyance').id == message.guild.id) {
    if (message.attachments.first() != null) {
      logChnl.send(`\`\`\` <${date_format_str}> | ${message.author.username}#${message.author.discriminator} @ #${chanName}: ${message.attachments.first().url} \`\`\``)
    } else {
      logChnl.send(`\`\`\` <${date_format_str}> | ${message.author.username}#${message.author.discriminator} @ #${chanName}: ${message.content} \`\`\``)
    }
  }
});

// Log the client in
client.login(settings.clientSecret);
// console.log(settings.clientSecret);
