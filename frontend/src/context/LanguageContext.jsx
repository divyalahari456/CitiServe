import { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const LanguageContext = createContext();

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
];

// Simple in-memory cache to avoid re-translating the same text
const translationCache = {};

const getCacheKey = (text, lang) => `${lang}::${text}`;

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translating, setTranslating] = useState(false);

  // Translate a batch of strings, returns array of translated strings
  const translateBatch = useCallback(async (texts, targetLang = null) => {
    const lang = targetLang || language;
    if (lang === 'en') return texts;

    // Check cache first, identify which texts need translation
    const results = new Array(texts.length);
    const toTranslate = [];
    const toTranslateIndices = [];

    texts.forEach((text, i) => {
      if (!text || text.trim() === '') {
        results[i] = text;
        return;
      }
      const cached = translationCache[getCacheKey(text, lang)];
      if (cached) {
        results[i] = cached;
      } else {
        toTranslate.push(text);
        toTranslateIndices.push(i);
      }
    });

    // If everything was cached, return immediately
    if (toTranslate.length === 0) return results;

    try {
      setTranslating(true);
      const response = await axios.post('http://localhost:5000/api/translate/batch', {
        texts: toTranslate,
        targetLang: lang
      });

      if (response.data.success) {
        response.data.translations.forEach((translated, j) => {
          const originalIndex = toTranslateIndices[j];
          results[originalIndex] = translated;
          // Cache it
          translationCache[getCacheKey(toTranslate[j], lang)] = translated;
        });
      }
    } catch (err) {
      console.error('Translation failed:', err.message);
      // On failure, fill in originals
      toTranslateIndices.forEach((idx, j) => {
        if (!results[idx]) results[idx] = toTranslate[j];
      });
    } finally {
      setTranslating(false);
    }

    return results;
  }, [language]);

  // Translate a single string
  const translateOne = useCallback(async (text, targetLang = null) => {
    const [result] = await translateBatch([text], targetLang);
    return result;
  }, [translateBatch]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      translating,
      translateBatch,
      translateOne,
      LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export { LANGUAGES };
export default LanguageContext;
