//Imports
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const settings = require('./settings.json')

// Music Queue
module.exports.queue = {};

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
        ['everyone', 'Commands for everyone'],
        ['music', 'Music commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

// Run this when the client is ready
client.on('ready', () => {
    console.log('Logged in!');
    client.user.setActivity('.help');
});

// Log the client in
client.login(settings.clientSecret);
// console.log(settings.clientSecret);
