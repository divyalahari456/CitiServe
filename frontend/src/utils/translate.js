import axios from 'axios';

const API_URL = 'http://localhost:5000/api/translate';

/**
 * Translate a single text string
 * @param {string} text - The text to translate
 * @param {string} targetLang - Target language code (e.g. 'hi', 'te', 'ta')
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang) => {
  if (!text || targetLang === 'en') return text;
  try {
    const response = await axios.post(API_URL, { text, targetLang });
    return response.data.translatedText;
  } catch (err) {
    console.error('Translation error:', err.message);
    return text; // fallback to original
  }
};

/**
 * Translate multiple text strings in a batch
 * @param {string[]} texts - Array of texts to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string[]>} Array of translated texts
 */
export const translateBatchTexts = async (texts, targetLang) => {
  if (!texts.length || targetLang === 'en') return texts;
  try {
    const response = await axios.post(`${API_URL}/batch`, { texts, targetLang });
    return response.data.translations;
  } catch (err) {
    console.error('Batch translation error:', err.message);
    return texts; // fallback to originals
  }
};
