"use strict";

const express = require("express");
const line = require("@line/bot-sdk");
const serverless = require("serverless-http");
const app = express();

const config = require("./line/lineConfig");
const replyMsg = require("./line/sendReplyMessage");

// import { isLineSignature } from "./line/xLineSignature";

const router = express.Router(); //ルーティング用に追加
router.get("/", (req, res) => res.send("Hello LINE BOT!(GET)"));

router.post("/webhook", line.middleware(config.lineConfig), (req, res) => {
  console.log(req.body.events);

  // ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
  if (
    req.body.events[0].replyToken === "00000000000000000000000000000000" &&
    req.body.events[1].replyToken === "ffffffffffffffffffffffffffffffff"
  ) {
    res.send("Hello LINE BOT!(POST)");
    console.log("疎通確認用");
    return;
  }

  Promise.all(
    req.body.events.map((event) => {
      return replyMsg.send(event.replyToken, event.message.text);
    })
  ).then((result) => {
    console.log(result);
    return res.json(result);
  });
});

app.use("/.netlify/functions/reply", router);
module.exports = app;
module.exports.handler = serverless(app);
