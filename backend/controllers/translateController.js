const translate = require('google-translate-api-x');

// @desc    Translate a single text string
// @route   POST /api/translate
// @access  Public
const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ success: false, message: 'text and targetLang are required' });
    }

    // If target is English, return as-is
    if (targetLang === 'en') {
      return res.status(200).json({ success: true, translatedText: text });
    }

    const result = await translate(text, { to: targetLang });
    res.status(200).json({ success: true, translatedText: result.text });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ success: false, message: 'Translation failed', error: error.message });
  }
};

// @desc    Translate multiple text strings in a batch
// @route   POST /api/translate/batch
// @access  Public
const translateBatch = async (req, res) => {
  try {
    const { texts, targetLang } = req.body;

    if (!texts || !Array.isArray(texts) || !targetLang) {
      return res.status(400).json({ success: false, message: 'texts (array) and targetLang are required' });
    }

    // If target is English, return as-is
    if (targetLang === 'en') {
      return res.status(200).json({ success: true, translations: texts });
    }

    // Translate all texts concurrently
    const results = await Promise.all(
      texts.map(async (text) => {
        if (!text || text.trim() === '') return '';
        try {
          const result = await translate(text, { to: targetLang });
          return result.text;
        } catch {
          return text; // fallback to original on error
        }
      })
    );

    res.status(200).json({ success: true, translations: results });
  } catch (error) {
    console.error('Batch translation error:', error.message);
    res.status(500).json({ success: false, message: 'Translation failed', error: error.message });
  }
};

module.exports = { translateText, translateBatch };
