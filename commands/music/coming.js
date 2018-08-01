const { Command } = require('discord.js-commando');
const settings = require('../../settings.json');
const yt = require('ytdl-core');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coming',
            group: 'music',
            memberName: 'coming',
            description: '( ͡° ͜ʖ ͡°)',
            examples: ['coming']
        });
    }

    run(msg) {
      function join(){
        return new Promise((resolve, reject) => {
    			const voiceChannel = msg.member.voiceChannel;
    			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
    			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
  		  });
      }
      function play(){
        (function play(song) {
          console.log(song);
          queue[msg.guild.id].playing = true;
          if (song === undefined) return msg.channel.send('Queue is empty').then(() => {
            queue[msg.guild.id].playing = false;
            msg.member.voiceChannel.leave();
          });
          msg.channel.send('**( ͡° ͜ʖ ͡°)**');
          let dispatcher = msg.guild.voiceConnection.playStream(yt('https://www.youtube.com/watch?v=1pKngZstrXY', { audioonly: true }), { passes : settings.passes });
          });
          dispatcher.on('end', () => {
            collector.stop();
            play(queue[msg.guild.id].songs.shift());
          });
          dispatcher.on('error', (err) => {
            return msg.channel.send('error: ' + err).then(() => {
              collector.stop();
              play(queue[msg.guild.id].songs.shift());
            });
          });
        })(queue[msg.guild.id].songs.shift());
      }
      if (queue[msg.guild.id] === undefined) return msg.channel.send(`Add some songs to the queue first with ${settings.commandPrefix}add`);
      if (!msg.guild.voiceConnection) return join(msg).then(() => play(msg));
      if (queue[msg.guild.id].playing) return msg.channel.send('Already Playing');
      let dispatcher;
    }
};
