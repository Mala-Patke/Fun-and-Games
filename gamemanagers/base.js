const { User, TextChannel, Collection, Message } = require("discord.js");
const emotes = require('../util/emotes');
const { CommandoClient } = require("discord.js-commando");

module.exports = class BaseManager{
    /**
     * @param {User} host 
     * @param {TextChannel} channel 
     * @param {CommandoClient} client 
     */
    constructor(host, channel, client/*, maxplayers, minplayers*/){
        this.host = host;
        this.channel = channel;
        this.client = client;
//        this.maxplayers = maxplayers;
//        this.minplayers = minplayers;
    }
    
    /**
     * @returns {Promise<Array>} 
     */
    async startGame(min, max){
        return new Promise((res) => {
            let filter = m => m.content.startsWith(this.client.commandPrefix);
            this.channel.send(`${this.channel.lastMessage.author} has started a game! Respond with ${this.client.commandPrefix}join to join`)
            let collector = this.channel.createMessageCollector(filter);
            let members = [];
            collector.on('collect', collected => {
                let str = collected.content.substr(this.client.commandPrefix.length, collected.content.length);
                let obj = {
                    'start':(member) => {
                        if(member.id !== this.host.id) return this.channel.send("Only the host can start the game!");
                        if(members.length < min) return this.channel.send('There are not enough players to start this game!');
                        collector.stop();
                    },
                    'join':(member) => {
                        if(members.includes(member.id)) return this.channel.send(`${member}, you've already joined!`);
                        members.push(member);
                        this.channel.send(`${member} has joined! (${members.length}/${max})`);
                    }
                }
                console.log(str);
                let x = obj[str]
                try{
                    x(collected.author);
                } catch {}
                if(members.length === max) obj.start(this.host);
            })
            collector.on('end', collected => {
                res(collected.array().map(m => m.author));
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