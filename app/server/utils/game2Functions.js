
// Getting random words from the dictionary to send to front end
function getRandWords(data, lang, count = 10) {

    const allItems = Object.values(data).flat();

    const result = [];

    for (let i = 0; i < count; i++) {
        const item = allItems[Math.floor(Math.random() * allItems.length)];
        const word = item?.[lang][Math.floor(Math.random() * item[lang].length)];
        result.push(word);
    }
    return result;
}

module.exports = { getRandWords };