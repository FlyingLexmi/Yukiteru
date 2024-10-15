const mineflayer = require('mineflayer');
const vec3 = require("vec3");
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const mcData = require('minecraft-data');


var blocks = '';

async function beacon(bot) {
    botCoordinates = {
        x: bot.entity.position.x,
        y: bot.entity.position.y,
        z: bot.entity.position.z
      };
}