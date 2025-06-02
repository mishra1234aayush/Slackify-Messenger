const axios = require("axios");
require('dotenv').config({ path: __dirname +'/../../.env' });

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const CHANNEL_ID = process.env.SLACK_CHANNEL;
    
const headers = {
  Authorization: `Bearer ${SLACK_TOKEN}`,
  "Content-Type": "application/json",
};

exports.sendMessage = async (req, res) => {
    
  const { text,channel } = req.body;

  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: CHANNEL_ID,
      text: text
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SLACK_TOKEN}`
      }
    });
    console.log(response.data);
    

    res.send(response.data);
  } catch (error) {
    console.error(error.response.data);
    res.status(500).send(error.response.data);
  }
};

exports.scheduleMessage = async (req, res) => {
  const { channel, text, post_at } = req.body;

  if (!channel || !text || !post_at) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      "https://slack.com/api/chat.scheduleMessage",
      { channel, text, post_at}, { headers }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Error scheduling message:", err);
    res.status(500).json({ error: "Failed to schedule message" });
  }
};

exports.getMessages = async (req, res) => {
    
  try {
      if(req.query.channel === CHANNEL_ID){
    const response = await axios.get("https://slack.com/api/conversations.history", {
      headers,
      params: { channel: CHANNEL_ID, limit: 20 },
    });

    res.json(response.data);
  }
  } catch (err) {
    res.status(500).json({ error: "Your Channel Id Is Wrong..." });
  }
};

exports.editMessage = async (req, res) => {
  console.log(req.body);
  
  const {ts, text } = req.body;

  try {
    const response = await axios.post(
      "https://slack.com/api/chat.update",
      {
        channel: CHANNEL_ID,
        ts : ts,
        text : text,
      },
      { headers }
    );
   console.log(response.data);
   
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to edit message" });
  }
};

// ✅ Delete Message
exports.deleteMessage = async (req, res) => {
  console.log(req.body);
  
  const { ts } = req.body;

  try {
    const response = await axios.post(
      "https://slack.com/api/chat.delete",
      {
        channel: CHANNEL_ID,
        ts,
      },
      { headers }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
