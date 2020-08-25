const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const stuff = require('../../cah.json');

module.exports = class CAHCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cah',
			group: 'games',
			memberName: 'cah',
			description: 'Starts a CAH game.',
		});
	}

	run(message) {
		let blackcards = [];

		var i = 0;
		for (i; i < stuff.blackCards.length; i++) {
		    blackcards.push(stuff.blackCards[i].text)
		}

		let prompt = blackcards[Math.floor(Math.random() * blackcards.length)];
		message.say(`Here is your black card: "${prompt}"`);

		let whitecards = [];
		for (i = 0; i < stuff.whiteCards.length; i++) {
		    whitecards.push(stuff.whiteCards[i])
		}

		let options = [];

		for (i = 0; i < 10; i++) {
		    let randint = Math.floor(Math.random() * whitecards.length)
		    options.push(whitecards[randint]);
		}

		let dict = {};

		for (i = 0; i < options.length; i++) {
		    dict[options[i]] = Math.floor(Math.random() * 100)
		}

		const whitecardsEmbed = new Discord.MessageEmbed()
		    .setColor('#fffffe')
		    .setAuthor(`${message.author.username}'s CAH cards`, message.author.displayAvatarURL())
		    .setDescription(`Here are your CAH cards. If you would like to play any of them, enter the number *below* the white card in #${message.channel.name}.`)

		for(var key in dict) {
		    whitecardsEmbed.addField(`"${key}"`, dict[key])
		}
		message.author.send(whitecardsEmbed)
		
		// Not useful yet.
		const filter = m => m.author.id === message.author.id;
		const collector = message.channel.createMessageCollector(filter, { max: 1 });

		collector.on('collect', m => {
		    console.log(m.content)
		});
	}
};
