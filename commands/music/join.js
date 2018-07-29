const { Command } = require('discord.js-commando');
const settings = require('../../settings.json');
const yt = require('ytdl-core');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Makes the bot join the channel',
            examples: ['join']
        });
    }

    run(msg) {
      // Only try to join the sender's voice channel if they are in one themselves
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            msg.send('I have connected to the channel!');
          })
          .catch(console.log);
      } else {
        msg.send('You need to join a voice channel first!');
      }
    }
};
