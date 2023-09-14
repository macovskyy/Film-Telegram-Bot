const TelegramBot = require('node-telegram-bot-api');

const { getToken } = require('./helpers/helpers')
const token = getToken();
const bot = new TelegramBot(token, { polling: true });

const { mainMenu } = require('./menu/menu');
const { filmMenu } = require('./menu/menu');
const { Film, chooseFilm } = require('./film/film');

// обробка команди /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привіт! Я твій бот. Обери одну з опцій:', mainMenu);
});

// обробка команди /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Для того, щоб працювати зі мною, використовуй меню.\nЙого можна викликати за допомогою смс "Головне меню"', mainMenu);
});

// головне меню
bot.onText(/Головне меню/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Обери одну з опцій:', mainMenu);
});

// ФІЛЬМИ
bot.onText(/Знайти фільм на вечір/, (msg) => {
    const chatId = msg.chat.id;
    const filmList = ['Комедія', 'Драма', 'Трилер', 'Бойовик'];

    bot.sendMessage(chatId, 'Чудово! Обери потрібний жанр:', filmMenu);

    // очікування смс від користувача
    bot.once('message', async (response) => {
        const userResponse = response.text;

        // перевірка коректності відповіді користувача
        if (filmList.includes(userResponse)) {
            bot.sendMessage(chatId, `Ви вибрали жанр: ${userResponse}`);
            await chooseFilm(bot, chatId, userResponse);
            await new Promise(resolve => setTimeout(resolve, 1000));
            bot.sendMessage(chatId, 'Приємного перегляду!', mainMenu);
        } else if(!userResponse.includes('/') && userResponse!=='Головне меню'){
            bot.sendMessage(chatId, 'Випадковий фільм із загального списку');
            await chooseFilm(bot, chatId, 0);
            await new Promise(resolve => setTimeout(resolve, 1000));
            bot.sendMessage(chatId, 'Приємного перегляду!', mainMenu);
        }
    });
})
// відслідковування помилок
bot.on('polling_error', (error) => {
    console.error(error);
});

console.log('Бот запущен');

