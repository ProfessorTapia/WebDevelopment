const { translateText } = require("../services/translationService");
const wordData = require("../data/translation_dictionary.json");
const {
  getRandWords,
  getRandCategories,
  checkTranslation,
} = require("../utils/game1Functions");

// Optional fallback if translation API fails
async function fallbackTranslateText(word) {
  return word;
}

// To get correct answer from dictionary
function getCorrectAnswer(language, word, category) {
  try {
    const entry = wordData[language][category][word];
    if (Array.isArray(entry) && entry.length > 0) return entry[0];
    return null;
  } catch {
    return null;
  }
}

// Start Game 1
const startGame1 = async (req, res) => {
  try {
    const { language = "en", count = 10 } = req.query;
    const promptLang = language === "en" ? "spanish" : "english";

    const randomCategories = getRandCategories(promptLang, 1);
    const selectedCategory = randomCategories[0];

    const prompts = getRandWords(promptLang, Number(count), selectedCategory);

    // Build the answer key using the json dictionary
    let key = [];
    for (const word of prompts) {
      try {
        const dictEntry = wordData[promptLang][selectedCategory][word];
        if (Array.isArray(dictEntry) && dictEntry.length > 0) {
          key.push(dictEntry[0]); // first translation in the list
        } else {
          // fallback to translation API if not found
          const translated = await translateText(
            word,
            language === "en" ? "en" : "es",
            "auto"
          );
          key.push(translated);
        }
      } catch {
        const translated = await fallbackTranslateText(word);
        key.push(translated);
      }
    }
    res.json({
      meta: {
        uiLanguage: language,
        promptingLanguage: promptLang,
        category: selectedCategory,
        total: prompts.length,
      },
      prompts,
      key,
    });
  } catch (error) {
    console.error("Error in startGame:", error);
    res
      .status(500)
      .json({ message: "Error starting game", error: error.message });
  }
};

// Submit Answers for Game 1
const submitAnswersGame1 = async (req, res) => {
  try {
    const { language = "en", category, responses } = req.body;
    const promptLang = language === "en" ? "spanish" : "english";

    // Normalize category names, makes integration with frontend easier
    const categoryMap = {
      animal: "animales",
      family: "familia",
      weather: "clima",
      building: "edificios",
      furniture: "muebles",
      clothing: "ropa",
      food_and_drink: "comida_y_bebida",
      body_part: "partes_del_cuerpo",
      verb: "verbo",
      color: "color",
      adjective: "adjetiva",
      adverb: "adverbio",
    };

    const normalizedCategory = categoryMap[category] || category; // use map if exists, otherwise same value

    let results = [];
    let correctCount = 0;

    for (const { prompt, answer } of responses) {
      const isCorrect = checkTranslation(promptLang, prompt, answer, normalizedCategory);

      results.push({
        prompt,
        userAnswer: answer,
        isCorrect,
        correctAnswer: isCorrect
          ? answer
          : getCorrectAnswer(promptLang, prompt, normalizedCategory),
      });

      if (isCorrect) correctCount++;
    }

    const score = ((correctCount / responses.length) * 100).toFixed(0);

    res.json({
      total: responses.length,
      correct: correctCount,
      score: `${score}%`,
      results,
    });
  } catch (error) {
    console.error("Error in submitAnswers:", error);
    res
      .status(500)
      .json({ message: "Error checking answers", error: error.message });
  }
};

module.exports = { startGame1, submitAnswersGame1 };
