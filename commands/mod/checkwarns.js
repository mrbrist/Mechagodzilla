const { Command } = require('discord.js-commando');
const Discord = require('discord.js')
const settings = require('../../settings.json');
const yt = require('ytdl-core');

module.exports = class CheckWarnsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'checkwarns',
      group: 'mod',
      memberName: 'checkwarns',
      description: 'Warns a user',
      examples: ['checkwarns']
    });
  }

  run(msg) {
    var warnArr = {}
    var tosend = []
    const modLog = msg.guild.channels.find('name', 'mod-log')
    modLog.fetchMessages()
      .then(messages => {
        for (var i = 0; i < messages.array().length; i++) {
          var msgTimeDiff = msg.createdTimestamp - messages.array()[i].createdTimestamp
          var userId = messages.array()[i].embeds[0].fields[0].value.replace(/([@<>])/g, '')
          var user = msg.guild.members.find('id', userId)
          var userDiscrim = `${user.user.username}#${user.user.discriminator}`
          if (msgTimeDiff > 1728000000) { // older than 20 days 20days = 1728000000
            messages.array()[i].delete()
          }
          if (!warnArr[userDiscrim]) {
            warnArr[userDiscrim] = 0
          }
          warnArr[userDiscrim]++
        }
        for (var user in warnArr) {
          tosend.push(`${user}: ${warnArr[user]}`)
        }
        msg.reply(`Displaying current warns and removing old ones... \n\`\`\`${tosend.join('\n')}\`\`\``)
      })
      .catch(console.error)
  }
};
