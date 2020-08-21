const { User, TextChannel, Client, MessageEmbed, Collection } = require("discord.js");

module.exports = class BaseManager{
    /**
     * 
     * @param {User} host 
     * @param {TextChannel} channel 
     * @param {Client} client 
     * @param {Number} maxplayers 
     */
    constructor(host, channel, client, maxplayers){
        this.host = host;
        this.channel = channel;
        this.client = client;
        this.maxplayers = maxplayers;
    }

    /**
     * @returns {Object} User for host, array of users for players
     */
    async startGame(){
        return new Promise((res) => {
            let responses = [`${this.client.commandPrefix}start`, `${this.client.commandPrefix}join`]
            let filter = m => responses.includes(m.content)
            let collector = this.channel.createMessageCollector(filter);
            let iterator = 0;
            collector.on('collect', collected => {
                let start = (collected.content === responses[0] && collected.author.id === this.host.id) ||
                            iterator === this.maxplayers;
                if(start) collector.stop();
            })
            collector.on('end', collected => {
                res({host: this.host, players: collected.array()});
            })
        })
    }

    /**
     * @param {User} user User making the decision
     * @param {Array} options Array of Options to select From
     * @param {String} question The prompt the user recieves
     */
    async reactionPrompt(user, options, question){
        return new Promise((res, rej) => {
            const embed = new MessageEmbed()
                .setTitle(question)
                .setDescription(options.join(" "))
            let msg = await this.channel.send(embed);
            let emotes = new Collection();
            for(let i in options){
                let charcode = i.toString().charCodeAt(0) - 49;
                let str = String.fromCharCode(charcode)
                let emote = emotes.get(str); //Emote map hasn't been formally added yet
                msg.react(emote);
            }
            let filter = (r, u) => u.id === user.id;
            let collector = msg.createReactionCollector(filter);
            collector.on('collect', (reaction, user) => {
                let selection = emotes.findKey(key => key === reaction.name);
                if(!selection) rej('Fail')
                else res(selection)
            })
        })
    }
    
}