const fs = require('fs');
const path = require('path');

const { getRandomInt } = require('../helpers/helpers');

class Film {
    constructor(name, rating, date, genre, director, time, image) {
        this.name = name;
        this.rating = rating;
        this.date = date;
        this.genre = genre;
        this.director = director;
        this.time = time;
        this.image = image;
    }

    async sendFilm(bot, chatId) {
        const caption = `Назва: ${this.name}\nРейтинг: ${this.rating}\nДата виходу: ${this.date}\nЖанр: ${this.genre}\nРежисер: ${this.director}\nТривалість: ${this.time}\n`;
        bot.sendPhoto(chatId, this.image, { caption });
    }
}

// прописуємо шлях до файлу
const filePath = path.join(__dirname, 'filmData.json');

if (fs.existsSync(filePath)) {
    // якщо файл існує, читаємо його вміст
    const filmData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // створюємо екземпляри класу 
    const filmArr = filmData.map((filmInfo) => new Film(
        filmInfo.name,
        filmInfo.rating,
        filmInfo.date,
        filmInfo.genre,
        filmInfo.director,
        filmInfo.time,
        filmInfo.image
    ));

    async function chooseFilm(bot, chatId, selectGenre) {
        // створюємо масив для фільмів за окремим жанром
        let genreFilmArr = [];
        // якщо жанр фільму обраний
        if (selectGenre !== 0) {
            for (let i = 0; i < filmArr.length; i++) {
                // відфільровування фільмів за жанром 
                if (filmArr[i].genre === selectGenre) {
                    // додаємо фільми у новий масив
                    genreFilmArr.push(filmArr[i]);
                }
            }
            // рандомно обираємо фільм потрібного жанру
            let numberOfFilms = genreFilmArr.length - 1;
            let randomFilm = getRandomInt(0, numberOfFilms);
            await genreFilmArr[randomFilm].sendFilm(bot, chatId);
        } else { // користувач не обрав жанр фільму
            let numberOfFilms = filmArr.length - 1;
            let randomFilm = getRandomInt(0, numberOfFilms);
            await filmArr[randomFilm].sendFilm(bot, chatId);
        }
        
    }

    module.exports = { Film, chooseFilm};
} else {
    console.error(`File '${filePath}' not found.`);
}