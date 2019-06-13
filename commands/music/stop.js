const { Command } = require('discord.js-commando')
module.exports = class AddCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'stop',
      group: 'music',
      memberName: 'stop',
      description: 'Stops the music and clears the queue',
      examples: ['stop']
    })
  }

  run (msg) {}
}
