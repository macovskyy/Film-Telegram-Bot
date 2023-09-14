const fs = require('fs');
const path = require('path');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getToken() {
    const filePath = path.join(__dirname, 'token.json');
    let token;
    if (fs.existsSync(filePath)) {
        const tokenData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Якщо є масив, то беремо перший елемент
        if (Array.isArray(tokenData) && tokenData.length > 0) {
            token = tokenData[0].token;
        }
    }

    console.log(token);

    return token;
}

module.exports = { getRandomInt, getToken };