const { Command } = require('discord.js-commando');
const manager = require('../../gamemanagers/codenames/codenamesmanager');
const { MessageEmbed, Message } = require('discord.js');

module.exports = class codenames extends Command{
    constructor(client){
        super(client, {
            name: 'codenames',
            aliases: ['cd'],
            group: 'games',
            memberName: 'cd',
            description: 'Tests the codenames initializer',
        });
    }

    /**
     * @param {Message} message 
     */
    async run(message){
        console.log('this runs')
       let gamemanager = new manager(message.author, message.channel, this.client);
       gamemanager.init()
        .then(obj => {
            console.log(obj);
           message.channel.send(`
                red operator(s): ${obj.redop.join(", ")}\n
                red spymaster: ${obj.redsm}\n
                blue operator(s): ${obj.blueop.join(", ")}\n
                blue spymaster: ${obj.bluesm}\n
                words:  \`\`\`${obj.board.map(e => e.word).join(", ")}\`\`\`
           `)
       })
       .catch(err => message.channel.send(`Error: ${err}`))
    }
}