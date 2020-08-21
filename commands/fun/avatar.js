const { Command } = require('discord.js-commando');

module.exports = class EightBall extends Command{
    constructor(client){
        super(client, {
            name: 'avatar',
            aliases: ['av', 'pfp', 'profilepic'],
            group: 'fun',
            memberName: 'avatar',
            description: 'Gets a random response from the magic 8 ball.'
            
        });
    }

    async run(message, args){
        if(!!args.length){
            let taggedUser = message.mentions.users.first();
            message.channel.send(taggedUser.displayAvatarURL({format: 'png'}))
        }else 
            message.channel.send(message.author.displayAvatarURL({format: 'png'}));
    }
}