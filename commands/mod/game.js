const { Command } = require('discord.js-commando');
const settings = require('../../settings.json');
const players = require('../../index.js').players;
const yt = require('ytdl-core');

module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'game',
            group: 'mod',
            memberName: 'game',
            description: 'Allow users to reserve spots in an upcomming game',
            examples: ['game <game> <free spots>'],
            args: [
              {
                  key: 'game',
                  prompt: 'What game will you be playing?',
                  type: 'string'
              },
              {
                  key: 'spots',
                  prompt: 'How many spots are available?',
                  type: 'string'
              },
              {
                  key: 'time',
                  prompt: 'How long until the game? (in mins)',
                  type: 'string'
              }
            ]
        });
    }

    run(msg, { game, spots, time }) {
      msg.channel.send(`A game of **${game}** is starting with **${spots}** free spots, react with :thumbsup: if you will be playing *[this will be active for ${time}m]*`)
          .then(function (message) {
            message.react("👍")
            const filter = (reaction, user) => reaction.emoji.name === '👍'
            const collector = message.createReactionCollector(filter, { time: time*60000 });
            // collector.on('collect', r => console.log(`Collected ${r.users.last()}`));
            function collection(user) {
              if (!user.bot) {
                var s1 = players[msg.guild.id] = {}
                var s2 = s1[game.toString()] = []
                s2.push(`${user.username}#${user.discriminator}`)
                return msg.channel.send(`${user} has reserved a spot for the **${game}** game`)
              }
            }
            function playing(col) {
              if (players[msg.guild.id][game].length > 0) {
                return `\n\`\`\`${players[msg.guild.id][game].join('\n')}\`\`\``
              } else {
                return ""
              }
            }
            collector.on('collect', r => collection(r.users.last()));
            collector.on('end', collected => msg.reply(`**${players[msg.guild.id][game].length}** user(s) signed up to play __**${game}**__ ${playing()}`));
          }).catch(function() {
            //Something
          });
    }
};
