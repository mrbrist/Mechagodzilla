const { Command } = require('discord.js-commando');
const settings = require('../../settings.json');
const yt = require('ytdl-core');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'Makes the bot leave the channel',
            examples: ['leave']
        });
    }

    run(msg) {
      // Only try to join the sender's voice channel if they are in one themselves
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.leave();
      } else {
        msg.send('You need to join a voice channel first!');
      }
    }
};
