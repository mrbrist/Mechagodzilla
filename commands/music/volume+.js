const { Command } = require('discord.js-commando');
module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume+',
            group: 'music',
            memberName: 'volume+',
            description: 'Increases the volume of the bot',
            examples: ['volume+']
        });
    }

    run(msg) {}
};
