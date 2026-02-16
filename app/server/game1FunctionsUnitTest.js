const {getRandWords, getRandCategories, checkTranslation, isWordInCategory, getAllowedWords} = require("./game1Functions.js")


//getRandWords test
console.log("getRandWords tests")
console.log("specifying only the language")
console.log(getRandWords("en"))
console.log("specifying language and number")
console.log(getRandWords("en", 3))
console.log("specifying language number and category")
console.log(getRandWords("en", 3, "animal"))

console.log("")

//getRandCategories test
console.log("getRandCategories tests")
console.log("without specifying the number")
console.log(getRandCategories())
console.log("specifying the number")
console.log(getRandCategories(3))

console.log("")

//checkTranslation test
console.log("checkTranslation tests")
console.log("correct input")
console.log(checkTranslation("es", "dog", "perro"))
console.log("incorrect input")
console.log(checkTranslation("es", "dog", "gato"))

console.log("")

//isWordInCategory test
console.log("isWordInCategory tests")
console.log("specifying the language, word, and category with correct input")
console.log(isWordInCategory("en", "dog", "animal"))
console.log("specifying the language, word, and category with incorrect input")
console.log(isWordInCategory("en", "dog", "weather"))

//isWordInCategory test
console.log("getAllowedWords tests")
console.log(getAllowedWords("en", "animal"))