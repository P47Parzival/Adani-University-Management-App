const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    const { message } = req.body;
    
    try {
        const response = await axios.post(
            'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
            {
                messages: [{ role: 'user', content: message }],
                system_prompt: "You are a helpful university assistant that provides clear, direct answers.",
                temperature: 0.8,
                max_tokens: 1000
            },
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                    'Content-Type': 'application/json',
                }
            }
        );

        res.json({ result: response.data.result });

    } catch (error) {
        console.error('Chatbot API Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to get response', 
            details: error.response?.data || error.message 
        });
    }
});

module.exports = router;
