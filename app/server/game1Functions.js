
const transDict = require("./translation_dictionary.json")

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//getWord
function getRandWords(language, num = 1, category = null){
    let possibleWords;
    let words;

    // get possible words either the whole dictionary or just 1 category
    if (category){
        try{
            possibleWords = transDict[category];
        } catch{
            console.log("invalid category");
        }
    }
    else{
        possibleWords = Object.values(transDict).flat();
    }
    try{
        possibleWords = possibleWords.map(word => word[language]).flat();
    } catch{
        console.log("invalid language");
    }
    // get random sample of words from possible words
    shuffleInPlace(possibleWords);
    words = possibleWords.slice(0,num);
    return words;
}

//getCategory
function getRandCategories(num = 1){
    const possibleCategories = Object.keys(transDict);
    shuffleInPlace(possibleCategories);
    const randCategories = possibleCategories.slice(0,num);
    return randCategories;
}


//checkTranslation
function checkTranslation(language, word, translation){
    possibleWords = Object.values(transDict).flat();
    return possibleWords.find(obj => obj["id"] === word)[language].includes(translation);
}


//isWordInCategory
function isWordInCategory(language, word, category){
    const possibleWords = transDict[category].flatMap(obj => obj[language]);
    return possibleWords.includes(word)
}

function getAllowedWords(language, category){
    const possibleWords = transDict[category].flatMap(obj => obj[language]);
    return possibleWords;
}

module.exports = {getRandWords,  getRandCategories, checkTranslation, isWordInCategory, getAllowedWords}; // export the function