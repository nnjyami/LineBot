const line = require("@line/bot-sdk");
const config = require("./lineConfig");

async function sendReplyMessage(replyToken, text) {
  const client = new line.Client(config.lineConfig);

  if (!client) console.log("clientError", client);

  const message = {
    type: "text",
    text: `下記のメッセージありがとう！\n${text}`,
  };

  console.log(replyToken, text);
  client
    .replyMessage(replyToken, message)
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      // error handling
      console.log("send Message Error", error);
    });
}

module.exports.send = sendReplyMessage;
