import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from '@google/genai'

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());

app.listen(PORT, () => console.log(`running on ${PORT}`));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

app.post('/generate', async (req, res) => {
    const idea = req.body.idea;
    console.log("Receiv")

    try {
        const response = await ai.models.generateContent( {
            model: 'gemini-3.6-flash',
            contents: `Give me 5 single words inspired by this story idea: "${idea}". Include a mix of verbs, nouns, and adjectives. Respond with ONLY the words separated by commas, nothing else.`,
        });
        const text = response.text;
        const words = text.split(",").map((w) => w.trim());

        res.json({words});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Generation failed.'});
    }
})

app.listen(3001, () => {
    console.log('Backend running on http:/localhost.3001');
}) ;