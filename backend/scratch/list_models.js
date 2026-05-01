const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const { GoogleAuth } = require('google-auth-library');
    // The SDK doesn't have a direct listModels, but we can try to hit the endpoint
    console.log('API Key:', process.env.GEMINI_API_KEY ? 'Set' : 'Not Set');
    
    // Actually, let's just try gemini-1.5-flash-latest
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent("Hi");
    console.log('Success with gemini-1.5-flash-latest');
  } catch (error) {
    console.error('Error with gemini-1.5-flash-latest:', error.message);
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        await model.generateContent("Hi");
        console.log('Success with gemini-pro');
    } catch (e) {
        console.error('Error with gemini-pro:', e.message);
    }
  }
}

listModels();
