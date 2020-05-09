const line = require("@line/bot-sdk");

export default async function (replyToken, text) {
  return new Promise((resolve, reject) => {
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
    const response = await client
      .replyMessage(replyToken, message)
      .catch((error) => {
        // error handling
        console.log("send Message Error", error);
        reject();
      });
    if(response){
      console.log("success", response);
      resolve();
    }
  });
}
