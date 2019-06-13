const { Command } = require('discord.js-commando')
const settings = require('../../settings.json')
const queue = require('../../index.js').queue
const yt = require('ytdl-core')

module.exports = class PlayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Plays music that is queued',
      examples: ['play']
    })
  }

  run (msg) {
    function join () {
      return new Promise((resolve, reject) => {
    			const voiceChannel = msg.member.voiceChannel
    			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...')
    			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err))
  		  })
    }
    function play () {
      (function play (song) {
        console.log(song)
        queue[msg.guild.id].playing = true
        if (song === undefined) {
          return msg.channel.send('Queue is empty').then(() => {
            queue[msg.guild.id].playing = false
            msg.member.voiceChannel.leave()
          })
        }
        msg.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`)
        let dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes: settings.passes })
        let collector = msg.channel.createCollector(m => m)
        collector.on('message', m => {
          if (m.content.startsWith(settings.commandPrefix + 'pause')) {
            msg.channel.send('Paused').then(() => { dispatcher.pause() })
          } else if (m.content.startsWith(settings.commandPrefix + 'resume')) {
            msg.channel.send('Resumed').then(() => { dispatcher.resume() })
          } else if (m.content.startsWith(settings.commandPrefix + 'skip')) {
            msg.channel.send('Skipped').then(() => { dispatcher.end() })
          } else if (m.content.startsWith(settings.commandPrefix + 'stop')) {
            msg.channel.send('Cleared the current queue').then(() => { queue[msg.guild.id].songs = []; dispatcher.end() })
          } else if (m.content.startsWith(settings.commandPrefix + 'volume+')) {
            if (Math.round(dispatcher.volume * 50) >= 100) return msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`)
            dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (5 * (m.content.split('+').length - 1))) / 50, 2))
            msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`)
          } else if (m.content.startsWith(settings.commandPrefix + 'volume-')) {
            if (Math.round(dispatcher.volume * 50) <= 0) return msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`)
            dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (5 * (m.content.split('-').length - 1))) / 50, 0))
            msg.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`)
          } else if (m.content.startsWith(settings.commandPrefix + 'time')) {
            msg.channel.send(`Time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000) / 1000) < 10 ? '0' + Math.floor((dispatcher.time % 60000) / 1000) : Math.floor((dispatcher.time % 60000) / 1000)}`)
          }
        })
        dispatcher.on('end', () => {
          collector.stop()
          play(queue[msg.guild.id].songs.shift())
        })
        dispatcher.on('error', (err) => {
          return msg.channel.send('error: ' + err).then(() => {
            collector.stop()
            play(queue[msg.guild.id].songs.shift())
          })
        })
      })(queue[msg.guild.id].songs.shift())
    }
    if (queue[msg.guild.id] === undefined) return msg.channel.send(`Add some songs to the queue first with ${settings.commandPrefix}add`)
    if (!msg.guild.voiceConnection) return join(msg).then(() => play(msg))
    if (queue[msg.guild.id].playing) return msg.channel.send('Already Playing')
    let dispatcher
  }
}
