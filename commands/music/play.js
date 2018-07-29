const { Command } = require('discord.js-commando');
const settings = require('../../settings.json')
const yt = require('ytdl-core');

let queue = {"459047097547882518":{"playing":false,"songs":[{"url":"https://www.youtube.com/watch?v=581KOQKsvjs","title":"VISUALIZER | Gmod TTT","requester":"Brist"}]}};

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: '',
            examples: ['play ']
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
          if (song === undefined) return msg.channel.sendMessage('Queue is empty').then(() => {
            queue[msg.guild.id].playing = false;
            msg.member.voiceChannel.leave();
          });
          msg.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
          let dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : settings.passes });
          let collector = msg.channel.createCollector(m => m);
          collector.on('message', m => {
            if (m.content.startsWith(settings.commandPrefix + 'pause')) {
              msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
            } else if (m.content.startsWith(settings.commandPrefix + 'resume')){
              msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
            } else if (m.content.startsWith(settings.commandPrefix + 'skip')){
              msg.channel.sendMessage('skipped').then(() => {dispatcher.end();});
            } else if (m.content.startsWith('volume+')){
              if (Math.round(dispatcher.volume*50) >= 100) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
              dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
              msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
            } else if (m.content.startsWith('volume-')){
              if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
              dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
              msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
            } else if (m.content.startsWith(settings.commandPrefix + 'time')){
              msg.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
            }
          });
          dispatcher.on('end', () => {
            collector.stop();
            play(queue[msg.guild.id].songs.shift());
          });
          dispatcher.on('error', (err) => {
            return msg.channel.sendMessage('error: ' + err).then(() => {
              collector.stop();
              play(queue[msg.guild.id].songs.shift());
            });
          });
        })(queue[msg.guild.id].songs.shift());
      }
      console.log(msg.guild.id);
      if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${settings.commandPrefix}add`);
      if (!msg.guild.voiceConnection) return join(msg).then(() => play(msg));
      if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already Playing');
      let dispatcher;
      queue[msg.guild.id].playing = true;
    }
};
