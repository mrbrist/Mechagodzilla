const { Command } = require('discord.js-commando');
module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'time',
            group: 'music',
            memberName: 'time',
            description: 'Displays the time the bot has been playing music for',
            examples: ['time']
        });
    }

    run(msg) {}
};
