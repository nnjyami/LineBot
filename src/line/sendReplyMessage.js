const line = require("@line/bot-sdk");

export default async function (replyToken, text) {
  console.log(replyToken, text);
  return new Promise((resolve, reject) => {
    const client = new line.Client({
      channelAccessToken:
        "Sy1nzq9Vw6yTVY0jo/Ai9EFO4d8VQLBYzFfqiECFNoaQTT3KP1qUFOXOEjQKTr8xMZEdRJZjiRCrbR95FeCzE5iXbcCK/hp3mdQ0dzwZkSJLmJoEQeQqKlQvEfJB3Ljp+JLPMmojtLoDJGzVX5H9NAdB04t89/1O/w1cDnyilFU=",
    });

    if (!client) console.log("clientError", client);

    const message = {
      type: "text",
      text: `下記のメッセージありがとう！\n${text}`,
    };

    client
      .replyMessage(replyToken, message)
      .then(() => {
        console.log("success", message);
        resolve();
      })
      .catch((error) => {
        // error handling
        console.log("send Message Error", error);
        reject();
      });
  });
}
