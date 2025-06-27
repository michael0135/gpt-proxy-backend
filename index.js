const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // my actual key

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const aiReply = response.data.choices[0].message.content.trim();
    res.json({ response: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch response" });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});