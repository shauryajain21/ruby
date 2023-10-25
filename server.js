// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());  // Middleware for parsing JSON bodies

const path = require('path');

// ... [your other code]

// Serve static files from the directory where server.js is located.
app.use(express.static(__dirname));

// Serve your HTML file for the root path.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/generate-tweets', async (req, res) => {
    try {
        const content = req.body.content;
        // Call ChatGPT API (replace this with proper call)
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo-instruct",
            prompt: `Please generate under 50 words of content using the information provided in the given link. Your response should be clear, well-structured, and detailed, ensuring it is precise, comprehensive, and of high quality. At the end of each response add "curated by Timeless" ${content}`,
            max_tokens: 1500
            
        }, {
            headers: {
                'Authorization': `Bearer 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`
            }
        });

        const tweetStorm = response.data.choices[0].text.trim();
        res.json({ tweetStorm });
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating tweet storm.');
    }
    
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
