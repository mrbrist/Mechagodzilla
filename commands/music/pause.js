const { Command } = require('discord.js-commando')
module.exports = class AddCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'pause',
      group: 'music',
      memberName: 'pause',
      description: 'Pauses the music',
      examples: ['pause']
    })
  }

  run (msg) {}
}
