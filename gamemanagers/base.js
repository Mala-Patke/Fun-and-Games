const { User, TextChannel, Client, Collection, Message } = require("discord.js");
const emotes = require('../util/emotes');

module.exports = class BaseManager{
    /**
     * @param {User} host 
     * @param {TextChannel} channel 
     * @param {Client} client 
     * @param {Number} maxplayers
     * @param {Number} minplayers
     */
    constructor(host, channel, client, maxplayers, minplayers){
        this.host = host;
        this.channel = channel;
        this.client = client;
        this.maxplayers = maxplayers;
        this.minplayers = minplayers;
    }
    
    /**
     * @returns {Promise<Array>} 
     */
    async startGame(){
        return new Promise((res) => {
            let responses = [`${this.client.commandPrefix}start`, `${this.client.commandPrefix}join`]
            let filter = m => responses.includes(m.content)
            let collector = this.channel.createMessageCollector(filter);
            let iterator = 0;
            collector.on('collect', collected => {
                this.channel.send(`${collected.author} has joined the game. We now have ${iterator} players!`)
                let start = (collected.content === responses[0] && collected.author.id === this.host.id) ||
                    iterator === this.maxplayers;
                if(start) collector.stop();
            })
            collector.on('end', collected => {
                res(collected.array());
            })
        })
    }

    /**
     * @param {User} user User making the decision
     * @param {Array} options Array of Options to select From
     * @param {Message} msg The prompt the user recieves
     * @returns {Promise<String>} Selected Option
     */
    async reactionPrompt(user, options, msg){
        return new Promise((res, rej) => {
            for(let i in options){
                let charcode = i.toString().charCodeAt(0) + 49;
                let str = String.fromCharCode(charcode)
                let emote = emotes[str];
                msg.react(emote);
            }
            let filter = (r, u) => u.id === user.id;
            let collector = msg.createReactionCollector(filter);
            collector.on('collect', (reaction, user) => {
                collector.stop();
                let selection = parseInt(String.fromCharCode(reaction.emoji.name.split("_")[2].charCodeAt(0) - 49));
                if(!selection) rej('Fail')
                else res(options[selection])
            })
        })
    }

    /**
     * @param {Array<Number>} users Array of Users
     * @param {Array<User>} options Array of options to select from
     * @param {Message} msg Poll Message
     * @returns {Promise<Collection<User, Number>} User => User's Selection
     */
    async createpoll(users, options, msg){
        return new Promise((res) => {
            for(let i in options){
                let charcode = i.toString().charCodeAt(0) + 49;
                let str = String.fromCharCode(charcode)
                let emote = emotes[str];
                msg.react(emote);
            }
            let filter = (r, u) => users.map(user => user.id).includes(u.id);
            let collector = msg.createReactionCollector(filter);
            const responses = new Collection();
            collector.on('collect', (reaction, user) => {
                reaction.users.remove(user);
                responses.set(user.id, reaction.emoji.name);
                if(responses.size === users.length) collector.stop();
            })
            collector.on('end', () => {
                msg.reactions.removeAll();
                let returndata = new Collection();
                let iterator = 0;
                responses.each((val) => {
                    let value = emotes[val].charCodeAt(0) - 49;
                    returndata.set(responses.keyArray()[iterator], parseInt(String.fromCharCode(value)));
                    iterator++;
                })
                res(returndata);
            })
            
        })
    }
    
}