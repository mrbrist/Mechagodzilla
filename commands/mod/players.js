const { Command } = require('discord.js-commando')
const players = require('../../index.js').players

module.exports = class QueueCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'players',
      group: 'mod',
      memberName: 'players',
      description: 'Displays the list of players signed up for the game',
      examples: ['players'],
      args: [
        {
          key: 'game',
          prompt: 'Enter the name of the game you want the list of players for',
          type: 'string'
        }
      ]
    })
  }

  run (msg, { game }) {
    function playing (col) {
      if (players[msg.guild.id][game].length > 0) {
        return `\n\`\`\`${players[msg.guild.id][game].join('\n')}\`\`\``
      } else {
        return ''
      }
    }
    msg.reply(`**${players[msg.guild.id][game].length}** user(s) signed up to play __**${game}**__ ${playing()}`)
  }
}
