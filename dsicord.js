const Discord = require('discord.js');
const { Intents } = require('discord.js');


const TOKEN = "";
const discordClient = new Discord.Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

discordClient.on('ready', () => {
    console.log("Discord bot ready");
});