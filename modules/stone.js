const mineflayer = require('mineflayer');
const vec3 = require("vec3");
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const mcData = require('minecraft-data');

const stoneFarm = new vec3(51, 63, 242);
var stoneCount = 0;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function stone(bot, message) {
    const chestGoal = new goals.GoalNear(stoneFarm.x, stoneFarm.y, stoneFarm.z, 1); // Устанавливаем цель
    bot.pathfinder.setGoal(chestGoal);

    // Ждем достижения цели
    await new Promise((resolve) => {
        bot.once('goal_reached', resolve);
    });

    const stoneBlockType = mcData(bot.version).blocksByName['cobblestone'].id;
    const maxDistance = 1;

    try {
        while (true) {
            const block = bot.findBlock({
                matching: stoneBlockType,
                maxDistance: maxDistance
            });

            if (!block) {
                await delay(1000);
                continue;
            }

            if (message === "-stop") {
                break;
            }

            let tool = bot.inventory.items().find(item => item.name.includes('pickaxe'));

            if (!tool) {
                const chestPos = new vec3(52, 63, 242);
                const chestBlock = bot.blockAt(chestPos);
                console.log(chestBlock);

                const chest = await bot.openContainer(chestBlock);
                console.log(chest.slots);

                // Ищем кирку в сундуке
                const toolInChest = chest.slots.find(item => item && item.name.includes('pickaxe'));

                if (toolInChest) {
                    await chest.withdraw(toolInChest.type, null, 1); // Забираем кирку из сундука
                } else {
                    bot.chat("Кирка не найдена в сундуке.");
                    chest.close();
                    return;
                }

                chest.close();

                // Проверяем инвентарь после того, как взяли кирку
                tool = bot.inventory.items().find(item => item.name.includes('pickaxe'));
            }

            if (tool) {
                await bot.equip(tool, 'hand');
            }

            await bot.dig(block);
            stoneCount++;
            console.log(`Сломан камень. Всего сломано: ${stoneCount}`);
        }
    } catch (err) {
        bot.chat("Ошибка при ломании блока: " + err.message);
    }
}

module.exports = {
    stone
}
