const { Command } = require('discord.js-commando');

module.exports = class EightBall extends Command{
    constructor(client){
        super(client, {
            name: 'hangman',
            aliases: ['manghan'],
            group: 'fun',
            memberName: 'iejfee',
            description: 'Gets a random response from the magic 8 ball.',
        });
    }

    async run(message){
        message.reply('ree');
    }
}