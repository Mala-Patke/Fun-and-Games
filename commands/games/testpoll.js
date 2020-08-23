const { Command } = require('discord.js-commando');
const baseutil = require('../../gamemanagers/base');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class TestPoll extends Command{
    constructor(client){
        super(client, {
            name: 'testpoll',
            aliases: ['poll'],
            group: 'games',
            memberName: 'poll',
            description: 'Tests the poll command',
        });
    }

    /**
     * @param {Message} message 
     */
    async run(message){
        const base = new baseutil(message.author, message.channel, this.client, 10)
        const mentions = message.mentions.users;
        const embed = new MessageEmbed()
            .setTitle('Should Person A Be elected Chancellor?')
            .setDescription('A: Yes\nB:Nein');
        let embd = await message.channel.send(embed)
        let options = ["Player has been selected Chancellor", "The vote has failed. Player has not been selected Chancelor"]
        base.createpoll(mentions.array(), options, embd)
            .then(res => {
                let most = res.array().sort((a,b) => res.array().filter(v => v===a).length - res.array().filter(v => v===b).length
                ).pop();
                const newEmbed = new MessageEmbed().setTitle(options[most])
                embd.edit('\u200b', {embed: newEmbed});
            });
    }
}