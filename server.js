const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_yourkeyhere");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(express.static("."));

const openai = new OpenAIApi(new Configuration({
    apiKey: "sk-proj-your-openai-key-here",
}));

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    const reply = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: message }]
    });

    res.json({ reply: reply.data.choices[0].message.content });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});