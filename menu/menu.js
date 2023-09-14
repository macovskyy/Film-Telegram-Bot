const mainMenu = {
    reply_markup: {
        keyboard: [
            ['Знайти фільм на вечір',]
        ],
        one_time_keyboard: true
    }
};

const filmMenu = {
    reply_markup: {
        keyboard: [
            ['Комедія', 'Драма'],
            ['Трилер', 'Бойовик'],
            ['Будь-який жанр']
        ],
        one_time_keyboard: true
    }
}

module.exports = { mainMenu, filmMenu };