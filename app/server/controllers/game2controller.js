const { getRandWords } = require("../utils/game2Functions");
const transDict = require("../data/translation_dictionary.json");

const startGame2 = (req, res) => {
  // Clicking start game 2 should send a list of random words from the dictionary, which will then be modfied
  // By the front end
  try {
    const { language = "en" } = req.query;

    const randWords = getRandWords(transDict, language, 10);

    return res.json({
      ok: true,
      meta: {
        uiLanguage: language,
        randomWords: randWords,
      },
    });
  } catch (error) {
    console.error("Error in starting Game 2");
    return res
      .status(500)
      .json({
        ok: false,
        message: "Error starting game",
        error: error.message,
      });
  }
};

module.exports = { startGame2 };
