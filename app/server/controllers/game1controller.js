const { translateText } = require("../services/translationService");
const wordData = require("../data/translation_dictionary.json");
const {
  fillTemplate,
  chooseTemplate,
  checkWordInGroup,
  fillTemplateWithParts,
} = require("../utils/game1Functions");
const { ok } = require("assert");
const { text } = require("stream/consumers");

const TEMPLATE_CATEGORIES = [
  "animal",
  "verb",
  "food_and_drink",
  "color",
  "adjective",
  "family",
  "body_part",
  "clothing",
  "building",
  "weather",
];

// Start Game 1
const startGame1 = async (req, res) => {
  try {
    const { language = "en" } = req.query;

    return res.json({
      meta: {
        uiLanguage: language,
        totalCategories: TEMPLATE_CATEGORIES.length,
      },
      categories: TEMPLATE_CATEGORIES.map((id) => ({
        id,
        label: id.replaceAll("_", " "),
      })),
    });
  } catch (error) {
    console.error("Error in startGame1:", error);
    return res
      .status(500)
      .json({ message: "Error starting game", error: error.message });
  }
};

// Validates words belong in categories (in the opposite language) and returns a filled template story
const generateStoryGame1 = async (req, res) => {
  try {
    const { language = "en", responses } = req.body;
    const templateKeyMixed = language === "en" ? "template_en" : "template_es";
    const answerLang = language === "en" ? "es" : "en";
    const templateKeyImmersion = answerLang === "en" ? "template_en" : "template_es";

    if (!Array.isArray(responses) || responses.length === 0) {
      return res
        .status(400)
        .json({ message: "Bad request: responses must be a non-empty array" });
    }

    const errors = [];
    const wordsMap = {};
    const availableCategories = [];

    for (const item of responses) {
      const category = item?.category;
      const word = item?.word;

      if (!category || typeof category !== "string") {
        errors.push({
          categoryId: category ?? null,
          code: "MISSING_CATEGORY",
          message: "Each response must include a valid category string",
        });
        continue;
      }

      if (!word || typeof word !== "string" || word.trim().length === 0) {
        errors.push({
          categoryId: category,
          code: "MISSING_WORD",
          message: "Each response must include a non-empty word string",
        });
        continue;
      }

      if (!TEMPLATE_CATEGORIES.includes(category)) {
        errors.push({
          categoryId: category,
          code: "UNKNOWN_CATEGORY",
          message: `Unknown category "${category}".`,
        });
        continue;
      }

      if (wordsMap[category]) {
        errors.push({
          categoryId: category,
          code: "DUPLICATE_CATEGORY",
          message: "Duplicate category provided",
        });
        continue;
      }

      const normalizedWord = word.trim().toLowerCase();

      const isValid = checkWordInGroup(answerLang, normalizedWord, category);
      if (!isValid) {
        errors.push({
          categoryId: category,
          code: "NOT_IN_CATEGORY",
          message: `"${word}" doesn't look like it fits the "${category}" category.`,
        });
        continue;
      }

      wordsMap[category] = normalizedWord;
      availableCategories.push(category);
    }

    if (errors.length > 0) {
      return res.json({ ok: false, errors });
    }

    const missing = TEMPLATE_CATEGORIES.filter((c) => !(c in wordsMap));
    if (missing.length > 0) {
      return res.json({
        ok: false,
        errors: missing.map((c) => ({
          categoryId: c,
          code: "MISSING_REQUIRED_CATEGORY",
          message: `Missing a word for a required category: "${c}"`,
        })),
      });
    }

    let template;
    try {
      template = chooseTemplate(availableCategories);
    } catch (e) {
      return res.json({
        ok: false,
        errors: [{ code: "NO_TEMPLATE", message: e.message }],
      });
    }

    const templateStrMixed = template[templateKeyMixed];
    const templateStrImmersion = template[templateKeyImmersion];

    let mixedText;
    try {
      mixedText = fillTemplate(templateStrMixed, wordsMap);
    } catch (e) {
      return res.json({
        ok: false,
        errors: [{ code: "TEMPLATE_FILL_ERROR", message: e.message }],
      })
    }

    let immersion;
    try {
      immersion = fillTemplateWithParts(templateStrImmersion, wordsMap);
    } catch (e) {
      return res.json({
        ok: false,
        errors: [{ code: "TEMPLATE_FILL_ERROR", message: e.message }],
      })
    }

    return res.json({
      ok: true,
      stories: {
        mixed: {
          language,
          text: mixedText,
        },
        immersion: {
          language: answerLang,
          text: immersion.text,
          parts: immersion.parts,
        }
      },
      meta: {
        uiLanguage: language,
        answerLanguage: answerLang,
        templateId: template.id,
        categories: template.categories,
      },
    });
  } catch (error) {
    console.error("Error in generateStoryGame1:", error);
    return res
      .status(500)
      .json({ message: "Error generating story", error: error.message });
  }
};

module.exports = { startGame1, generateStoryGame1 };
