const { CommandoClient } = require('discord.js-commando');
const path = require('path')
require('dotenv').config();

const client = new CommandoClient({
    owner: '674140360079048714',
    commandPrefix: '+'
})

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['games', 'Games'],
        ['fun', 'Fun'],
        ['misc', 'Misc']
	])
	.registerDefaultGroups()
	.registerDefaultCommands({ help: false })
    .registerCommandsIn(path.join(__dirname, 'commands'));
    
client.once('ready', async () => {
    await client.user.setActivity({ name: "You", type: "WATCHING" })
    console.log("Activity set")
    console.log(`${client.user.username} is all ready to go!`)
})

client.on('error', err => console.error(err));

client.once('rateLimit', rld => console.log(rld));

client.login(process.env.TOKEN);