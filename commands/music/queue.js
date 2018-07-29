const { Command } = require('discord.js-commando');
const settings = require('../../settings.json')
const yt = require('ytdl-core');

let queue = {"459047097547882518":{"playing":false,"songs":[{"url":"https://www.youtube.com/watch?v=581KOQKsvjs","title":"VISUALIZER | Gmod TTT","requester":"Brist"}]}};

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: '',
            examples: ['queue']
        });
    }

    run(msg) {
      if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with ${tokens.prefix}add`);
  		let tosend = [];
  		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
  		msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
    }
};
