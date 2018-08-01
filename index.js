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
  const guild = client.guilds.find('name','Bot Testing');
  const logChnl = guild.channels.find('name','chat-log')
  if (!message.author.bot && client.guilds.find('name','Bot Testing').id == message.guild.id) {
    if (message.attachments.first() != null) {
      logChnl.send(`\`\`\` ${message.author.username}#${message.author.discriminator}: ${message.attachments.first().url} \`\`\``)
    } else {
      logChnl.send(`\`\`\` ${message.author.username}#${message.author.discriminator}: ${message.content} \`\`\``)
    }
  }
});

// Log the client in
client.login(settings.clientSecret);
// console.log(settings.clientSecret);
