const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear } = goals;

async function goto(bot, message) {
	const args = message.split(" ");
    const x = parseFloat(args[1]);
    const y = parseFloat(args[2]);
    const z = parseFloat(args[3]);
    bot.pathfinder.setGoal(new GoalNear(x, y, z, 1));
}

async function gotoSpawn(bot) {
	bot.pathfinder.setGoal(new GoalNear(60, 63, 244, 1));
}


module.exports = {
	goto,
	gotoSpawn
}