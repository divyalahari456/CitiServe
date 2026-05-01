const axios = require('axios');

async function testChat() {
  try {
    console.log('Sending message to chat API...');
    const response = await axios.post('http://localhost:5000/api/chat', { 
      message: 'Hello' 
    });
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
}

testChat();
