const { Command } = require('discord.js-commando');
const settings = require('../../settings.json')
const yt = require('ytdl-core');

let queue = {};

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'music',
            memberName: 'add',
            description: '',
            examples: ['add ']
        });
    }

    run(msg) {
      let url = msg.content.split(' ')[1];
  		if (url == '' || url === undefined) return msg.channel.sendMessage(`You must add a YouTube video url, or id after ${tokens.prefix}add`);
  		yt.getInfo(url, (err, info) => {
  			if(err) return msg.channel.sendMessage('Invalid YouTube Link: ' + err);
  			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
  			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
  			msg.channel.sendMessage(`added **${info.title}** to the queue`);
        console.log(JSON.stringify(queue));
  		});
    }
};
