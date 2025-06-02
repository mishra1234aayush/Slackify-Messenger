// server.js
const express = require("express");
const cors = require("cors");
const slackRoutes = require("../Routes/slackRoutes");

require('dotenv').config({ path: __dirname +'/../../.env' });
const port = process.env.PORT;

  

const app = express();
const PORT = process.env.PORT || 5000;
  
// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", slackRoutes);

app.get("/", (req, res) => {
  res.send("Slack Messaging Backend is Running ✅");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
