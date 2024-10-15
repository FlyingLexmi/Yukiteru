const mineflayer = require('mineflayer');
const vec3 = require("vec3");
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');



const spawnpoint = [ new vec3(60, 63, 238) ];
const chest_pos = [
    new vec3(64, 63, 240),
    new vec3(64, 63, 242),
    new vec3(64, 63, 244),
    new vec3(64, 63, 246),
    new vec3(64, 63, 248)
];

async function itemCounter(bot) {
    const defaultMove = new Movements(bot);
    bot.pathfinder.setMovements(defaultMove);

    for (let i = 0; i < chest_pos.length; i++) {
        const chestGoal = new goals.GoalNear(chest_pos[i].x, chest_pos[i].y, chest_pos[i].z, 1);
        bot.pathfinder.setGoal(chestGoal);
        await bot.pathfinder.goto(chestGoal);
        
        const chestBlock = bot.blockAt(chest_pos[i]);
        
        if (chestBlock && chestBlock.type === bot.registry.blocksByName['chest'].id) {
            const chest = await bot.openChest(chestBlock);
            const items = chest.containerItems();
            const itemCounts = {};

            for (const item of items) {
                if (item) {
                    if (itemCounts[item.displayName]) {
                        itemCounts[item.displayName] += item.count;
                    } else {
                        itemCounts[item.displayName] = item.count;
                    }
                }
            }
            for (const [itemName, count] of Object.entries(itemCounts)) {
                console.log(`${itemName}: ${count}`);
                bot.chat(`${itemName}: ${count}`);
            }

            await chest.close();
        } else {
            bot.pathfinder.setGoal(new GoalNear(spawnpoint));
        }
    }
}

module.exports = {
    itemCounter
};
