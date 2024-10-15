const mineflayer = require('mineflayer');


async function kill(bot) {
	bot.chat('/kill');
}


module.exports = {
	kill
}