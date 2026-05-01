const SYSTEM_INSTRUCTION = `You are a helpful, professional, and empathetic Civic Assistant for the 'CitiServe' platform in India.
Your primary role is to assist citizens with understanding government schemes, legal rights, and the process of filing or tracking complaints.
Keep your answers concise, clear, and easy to understand for the general public.
Do NOT hallucinate or invent non-existent Indian laws or schemes. If you don't know, kindly state that they should consult an official government portal.
Do NOT respond to prompts that are unrelated to civic services, laws, schemes, or the CitiServe platform. Politely redirect them to the topic.`;

let aiClient = null;

const getAiClient = async () => {
  if (aiClient) return aiClient;
  try {
    const { GoogleGenAI } = await import('@google/genai');
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    return aiClient;
  } catch (error) {
    console.error('Failed to initialize GoogleGenAI:', error);
    throw error;
  }
};

exports.handleChat = async (req, res) => {
  console.log('--- Incoming Chat Request ---');
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // TEST_MOCK bypass for connection verification
    if (message?.toUpperCase() === 'TEST_MOCK') {
      return res.status(200).json({ success: true, data: "System check successful! Your backend is correctly receiving messages." });
    }

    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });
    if (!apiKey) return res.status(500).json({ success: false, message: 'API key is missing.' });

    const ai = await getAiClient();
    
    // Using the newer gemini-2.5-flash model as 1.5 is deprecated
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      }
    });

    res.status(200).json({ success: true, data: response.text });
  } catch (error) {
    console.error('CRITICAL CHAT ERROR:', error);
    
    // Provide a descriptive message back to the frontend
    let userFriendlyMessage = 'Failed to generate response';
    if (error.message?.includes('quota')) {
        userFriendlyMessage = 'AI quota exceeded. Please check your Google AI Studio plan.';
    } else if (error.message?.includes('key')) {
        userFriendlyMessage = 'Invalid API Key. Please verify your Gemini API key.';
    } else if (error.status === 404) {
        userFriendlyMessage = 'Model not found. We are updating our AI models, please try again in a few minutes.';
    }

    res.status(500).json({
      success: false,
      message: userFriendlyMessage,
      debug: error.message
    });
  }
};
