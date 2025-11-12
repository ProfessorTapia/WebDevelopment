
const transDict = require("../data/translation_dictionary.json");

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
        possibleWords = Object.keys(transDict[language][category]);
        } catch{
            console.log("invalide language or category");
        }
    }
    else{
        possibleWords = Object.values(transDict[language]).flatMap(Obj => Object.keys(Obj));
    }

    // get random sample of words from possible words
    shuffleInPlace(possibleWords);
    words = possibleWords.slice(0,num);
    return words;
}

//getCategory
function getRandCategories(language, num = 1){
    const possibleCategories = Object.keys(transDict[language]);
    shuffleInPlace(possibleCategories);
    const randCategories = possibleCategories.slice(0,num);
    return randCategories;
}


//checkTranslation
function checkTranslation(language, word, translation, category = null){
    if(category){
        return transDict[language][category][word].includes(translation);
    }
    for (const category of Object.values(transDict[language])){
        if (Object.keys(category).includes(word)){
            return category[word].includes(translation.toLowerCase());
        }
    }
}


//checkWordInGroup
function checkWordInGroup(language, word, category){
    const possibleWords = Object.values(transDict[language][category]).flat()
    return possibleWords.includes(word)
}

module.exports = {getRandWords,  getRandCategories, checkTranslation, checkWordInGroup}; // export the function