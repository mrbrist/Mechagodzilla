const { Command } = require('discord.js-commando')
const settings = require('../../settings.json')
const queue = require('../../index.js').queue
const yt = require('ytdl-core')

module.exports = class AddCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'add',
      group: 'music',
      memberName: 'add',
      description: 'Add a song to the queue',
      examples: ['add <YouTube URL>'],
      args: [
        {
          key: 'url',
          prompt: 'Enter the YouTube URL you want to play',
          type: 'string'
        }
      ]
    })
  }

  run (msg, { url }) {
  		yt.getInfo(url, (err, info) => {
  			if (err) return msg.channel.send('Invalid YouTube Link: ' + err)
  			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = []
  			queue[msg.guild.id].songs.push({ url: url, title: info.title, requester: msg.author.username })
  			msg.channel.send(`Added **${info.title}** to the queue`)
      console.log(JSON.stringify(queue))
  		})
  }
}
