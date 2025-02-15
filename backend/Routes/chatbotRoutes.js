require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend access

const API_URL = 'https://chatgpt-42.p.rapidapi.com/o3mini';
const API_KEY = process.env.RAPIDAPI_KEY; // Store your key in .env

router.post('/', async (req, res) => {
    try {
        const response = await axios.post(
            API_URL,
            { messages: [{ role: 'user', content: req.body.message }], web_access: false },
            {
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Chatbot API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'API call failed', details: error.response?.data || error.message });
    }
});


module.exports = router;
