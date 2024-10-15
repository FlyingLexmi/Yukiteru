const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear } = goals;
const mcData = require('minecraft-data');
const { kill } = require('./modules/kill');
const { itemCounter } = require('./modules/itemCounter');
const { goto, gotoSpawn } = require('./modules/goto');
const { stone, stopStoneMining } = require('./modules/stone');

const host = "localhost"; 
const port = 33333;       
const nickname = "Brikaine"; 
const tag = "[Brikaine]"; 

const bot = mineflayer.createBot({
    username: nickname,
    port: port,
    host: host,
});

bot.once('spawn', () => {
    bot.loadPlugin(pathfinder);
    console.log(`${tag} ready!`);
});

bot.on('chat', (sender, message) => {
    if (message === "-itemCounter") {itemCounter(bot);}
    if (message === "-kill") {kill(bot);}
    if (message.startsWith("-goto")) {goto(bot, message);}
    if (message === "-gotoSpawn") {gotoSpawn(bot)}
    if (message === "-stop") {bot.pathfinder.stop();}
    if (message === "-setSpawn") {bot.chat('/spawnpoint');}
    if (message === "-stone") {stone(bot, message);}
    if (message === '--Stop') {gotoSpawn(bot)}
});
