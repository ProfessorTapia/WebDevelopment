const templates = require("../data/story_templates.json");
const transDict = require("../data/translation_dictionary.json");

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// get random sample of words from possible words
function shuffleInPlace(possibleWords, num) {
  words = possibleWords.slice(0, num);
  return words;
}

//getWord
function getRandWords(category, num = 1, lang = "en") {
  const entries = transDict?.[category];
  if (!Array.isArray(entries)) return [];

  // Collect possible words from that category in that lang
  const possibleWords = entries.flatMap((entry) => entry?.[lang] ?? []);
  shuffleInPlace(possibleWords);

  return possibleWords.slice(0, num);
}

//getCategory
function getRandCategories(num = 1) {
  const possibleCategories = Object.keys(transDict);
  shuffleInPlace(possibleCategories);
  return possibleCategories.slice(0, num);
}

//checkTranslation
function checkTranslation(language, word, translation, category = null) {
  if (category) {
    return transDict[language][category][word].includes(translation);
  }
  for (const category of Object.values(transDict[language])) {
    if (Object.keys(category).includes(word)) {
      return category[word].includes(translation.toLowerCase());
    }
  }
}

function normalizeWord(s) {
  return String(s ?? "")
    .trim()
    .toLowerCase();
}

// lang should be "en" or "es"
function checkWordInGroup(lang, word, category) {
  const normalized = normalizeWord(word);

  const entries = transDict?.[category];
  if (!Array.isArray(entries)) return false;

  return entries.some((entry) => {
    const list = entry?.[lang];
    if (!Array.isArray(list)) return false;
    return list.some((w) => normalizeWord(w) === normalized);
  });
}
/**
 * Pick a template that matches the required categories.
 *
 * @function chooseTemplate
 * @param {string[]} availableCategories - Categories for which user provided words.
 * @returns {object} - Template object containing `template_en`, `template_es`, and `categories`.
 * @throws {Error} If no template matches the provided categories.
 */
function chooseTemplate(availableCategories) {
  const matchingTemplates = templates.filter((template) =>
    template.categories.every((cat) => availableCategories.includes(cat)),
  );

  if (matchingTemplates.length === 0)
    throw new Error("No template matches the provided categories");

  return matchingTemplates[
    Math.floor(Math.random() * matchingTemplates.length)
  ];
}

/**
 * Fill a template with user-provded words for each category.
 *
 * @function fillTemplate
 * @param {string} templateStr - The template string containing category placeholders.
 * @param {Object.<string, string>} wordsMap - A mapping of category names to their replacement words.
 * @returns {string} - The completed story string with all placeholders replaced.
 * @throws {Error} If any placeholder in the template does not have a correspodning entry in `wordsMap`.
 */
function fillTemplate(templateStr, wordsMap) {
  let story = templateStr;

  const placeholders = templateStr.match(/\{(\w+)\}/g) || [];

  placeholders.forEach((placeholder) => {
    const category = placeholder.slice(1, -1);

    if (!(category in wordsMap))
      throw new Error(`Missing word for category: ${category}`);

    story = story.replaceAll(placeholder, wordsMap[category]);
  });

  return story;
}

module.exports = {
  getRandWords,
  getRandCategories,
  checkTranslation,
  checkWordInGroup,
  chooseTemplate,
  fillTemplate,
}; // export the function
