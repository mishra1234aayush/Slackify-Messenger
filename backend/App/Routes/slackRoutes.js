const express = require("express");
const router = express.Router();
const controller = require("../Controller/slackController");

router.post("/send", controller.sendMessage);

router.post("/schedule", controller.scheduleMessage);

router.get("/messages", controller.getMessages);

router.put("/edit", controller.editMessage);

router.delete("/delete", controller.deleteMessage);

module.exports = router;
