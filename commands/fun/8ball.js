const { Command } = require('discord.js-commando');
const responses = [
    'As I see it, yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'It is certain.',
    'It is decidedly so.',
    'Most likely.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Outlook good.',
    'Reply hazy, try again.',
    'Signs point to yes.',
    'Very doubtful.',
    'Without a doubt.',
    'Yes.',
    'Yes – definitely.',
    'You may rely on it.',
];

module.exports = class EightBall extends Command{
    constructor(client){
        super(client, {
            name: '8ball',
            aliases: ['eightball'],
            group: 'fun',
            memberName: 'iejfie',
            description: 'Gets a random response from the magic 8 ball.',
            args: [
                {
                    key: 'text',
                    prompt: 'What question would you like to ask the eight ball?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, args){
        let random = Math.floor(Math.random() * responses.length)
        return message.say(`🎱| ${responses[random]}`);
    }
}