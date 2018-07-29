const { Command } = require('discord.js-commando');
module.exports = class AddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Resumes the music',
            examples: ['resume']
        });
    }

    run(msg) {}
};
