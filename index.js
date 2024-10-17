const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/heru', async (req, res) => {
  const userPrompt = req.query.prompt;

  if (!userPrompt) {
    return res.status(400).json({ message: 'Please provide a prompt' });
  }

  try {
    const basePrompt = `You're name is HeruBot, You're created by Jay Mar, you have no model you're a helpful assistant. ${userPrompt}`;
    const apiUrl = `https://www.geo-sevent-tooldph.site/api/gpt4?prompt=${encodeURIComponent(basePrompt)}`;
    const response = await axios.get(apiUrl);

    const result = response.data.response;

    const botResponse = typeof result === 'string'
      ? result
      : (typeof result === 'object' && result !== null)
        ? Object.values(result).join(' ') 
        : "No response received from Heru AI. 🤖";

    res.json({ response: ` ${botResponse}` });
  } catch (error) {
    console.error('Error calling Heru AI: 😔', error);
    res.status(500).json({ message: 'Error processing your request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
