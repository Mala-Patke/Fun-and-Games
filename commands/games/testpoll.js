const { Command } = require('discord.js-commando');
const baseutil = require('../../gamemanagers/base');
const { MessageEmbed } = require('discord.js');

module.exports = class EightBall extends Command{
    constructor(client){
        super(client, {
            name: 'testpoll',
            aliases: ['poll'],
            group: 'games',
            memberName: 'poll',
            description: 'Tests the poll command',
        });
    }

    async run(message){
        const mentions = message.mentions.users;
        const embed = new MessageEmbed()
            .setTitle('Who do you choose?');
        baseutil.createpoll(mentions, mentions, embed)
            .then(res => console.log(res));
    }
}