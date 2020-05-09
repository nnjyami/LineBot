const line = require("@line/bot-sdk");

export default function (replyToken, message) {
  const client = new line.Client({
    channelAccessToken: process.env.LINE_CHANEL_ACCESS_TOKEN,
  });

  const message = {
    type: "text",
    text: `下記のメッセージありがとう！\n${message}`,
  };

  client
    .replyMessage(replyToken, message)
    .then(() => {
      console.log("success", message);
    })
    .catch((err) => {
      // error handling
    });
}
