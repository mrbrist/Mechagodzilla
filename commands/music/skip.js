const { Command } = require('discord.js-commando');
module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skips the current song',
            examples: ['skip']
        });
    }

    run(msg) {}
};
