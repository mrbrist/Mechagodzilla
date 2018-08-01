const { Command } = require('discord.js-commando');
const Discord = require('discord.js')
const settings = require('../../settings.json');
const yt = require('ytdl-core');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'mod',
            memberName: 'warn',
            description: 'Warns a user',
            examples: ['warn <@user> <Reason>'],
            args: [
              {
                  key: 'user',
                  prompt: 'Mention the user you want to warn',
                  type: 'string'
              },
              {
                  key: 'reason',
                  prompt: 'Why is this user being warned?',
                  type: 'string'
              }
            ]
        });
    }

    run(msg, { user, reason }) {
      let modlog = msg.guild.channels.find('name', 'mod-log');
      let userObj = msg.guild.members.find('id', user.replace(/([<@ >])+/g,''));
      const roleColor = msg.member.displayHexColor;
      userObj.user.send(`You have been warned. You were warned by: ${msg.author} for: \`\`${reason}\`\`. Contact a member of staff that is not ${msg.author} to dispute this.`)
      msg.reply(`\`\`${userObj.user.username}\`\` has been warned successfully`)
      const embed = new Discord.RichEmbed()
        .setTitle('')
        .setAuthor('Warning', userObj.user.avatarURL)
        .setColor(roleColor)
        .setTimestamp()
        .addField('User', userObj.user)
        .addField('Warned By', msg.author)
        .addField('Reason',`\`\`${reason}\`\``);

      modlog.send(embed)
    }
};
