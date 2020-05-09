const line = require("@line/bot-sdk");

export default async function (replyToken, text) {
  const client = new line.Client({
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  });

  if (!client) console.log("clientError", client);

  const message = {
    type: "text",
    text: `下記のメッセージありがとう！${text}`,
  };

  console.log(replyToken, text);
  client
    .replyMessage(replyToken, message)
    .then(() => {
      console.log("Sucessr");
    })
    .catch((error) => {
      // error handling
      console.log("send Message Error", error);
    });
}
