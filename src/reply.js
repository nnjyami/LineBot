import { isLineSignature } from "./line/xLineSignature";
import sendReplyMessage from "./line/sendReplyMessage";

exports.handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  if (!isLineSignature(event.headers["x-line-signature"])) {
    return {
      statusCode: 404,
      body: "Something wrong",
    };
  }
  const events = event.body.events;
  events.forEach((e) => {
    if (e.type === "message") {
      sendReplyMessage(e.replyToken, e.message.text);
    }
  });
  return {
    statusCode: 200,
    body: "Hello World",
  };
};
