"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const serverless = require("serverless-http");
const app = express();

const config = require("./line/lineConfig");

const router = express.Router();
router.get("/", (req, res) => {
  const client = new line.Client(config.lineConfig);

  const message = {
    type: "text",
    text: `Push 送信テスト`,
  };

  const userId = "U21e929dc8f4326b212fec89d59cae9b3";
  client.pushMessage(userId, message).then((result) => {
    return res.send("Send Push Message!");
  });
});

router.post("/webhook", line.middleware(config.lineConfig), (req, res) => {
  console.log(req.body.events);

  const client = new line.Client(config.lineConfig);

  const message = {
    type: "text",
    text: `Push 送信`,
  };

  const userId = "U21e929dc8f4326b212fec89d59cae9b3";

  client.pushMessage(userId, message).then((result) => {
    return res.send("Send Push Message!");
  });
});

app.use("/.netlify/functions/push", router);
module.exports = app;
module.exports.handler = serverless(app);
