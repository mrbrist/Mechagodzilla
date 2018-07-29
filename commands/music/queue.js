const { Command } = require('discord.js-commando');
const settings = require('../../settings.json');
const queue = require('../../index.js').queue;
const yt = require('ytdl-core');

module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Displays the queued songs',
            examples: ['queue']
        });
    }

    run(msg) {
      if (queue[msg.guild.id] === undefined) return msg.channel.send(`Add some songs to the queue first with ${settings.commandPrefix}add`);
  		let tosend = [];
  		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
      function CurQueue() {
        if (tosend.length > 0) {
          return `\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``
        } else {
          return ""
        }
      }
  		msg.channel.send(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}${CurQueue()}`);
    }
};
