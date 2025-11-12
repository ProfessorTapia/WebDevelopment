import { translate } from "@vitalets/google-translate-api";

/**
 * Translates text between English and Spanish using Google Translate.
 *
 * @async
 * @function translateText
 * @param {string} text - The text to translate.
 * @param {"en"|"es"} to - The target language code ("en" or "es").
 * @param {"en"|"es"|"auto"} [from="auto"] - The source language code ("en", "es", or auto-detect).
 * @returns {Promise<string>} The translated text.
 * @throws {Error} If input is invalid, translation fails, or rate limit is reached.
 */
export async function translateText(text, to, from = "auto") {
  if (typeof text !== "string" || !text.trim())
    throw new Error("Invalid input: 'text' must be a non-empty string");

  if (typeof to !== "string" || !to.trim())
    throw new Error("Invalid input: 'to' (target language) is required");

  try {
    const result = await translate(text, { from, to });

    if (!result?.text) throw new Error("Empty response from translation API");

    return result.text;
  } catch (error) {
    console.error(`Translation error: ${error}`);

    throw new Error(
      error.name === "TooManyRequestsError"
        ? "Translation service rate limit reached"
        : "Translation failed, please try again later"
    );
  }
}
