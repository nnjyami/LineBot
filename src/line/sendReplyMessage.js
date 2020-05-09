const line = require("@line/bot-sdk");

export default async function (replyToken, text) {
  console.log(replyToken, text);
  return new Promise((resolve, reject) => {
    const client = new line.Client({
      channelAccessToken: process.env.LINE_CHANEL_ACCESS_TOKEN,
    });

    if (!client) console.log("clientError", client);

    const message = {
      type: "text",
      text: `下記のメッセージありがとう！\n${text}`,
    };

    client
      .replyMessage(replyToken, message)
      .then(() => {
        console.log("success");
        resolve();
      })
      .catch((error) => {
        // error handling
        console.log("send Message Error", error);
        reject();
      });
  });
}
