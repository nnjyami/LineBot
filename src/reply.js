import { isLineSignature } from "./line/xLineSignature";
import sendReplyMessage from "./line/sendReplyMessage";

exports.handler = async (event, context) => {
  let isError = false;
  console.log("event", event);
  console.log("context", context);
  if (!isLineSignature(event.body, event.headers["x-line-signature"])) {
    isError = true;
  }
  const events = event.body.events;
  console.log(event.body.events);
  if (!events) isError = true;
  events.forEach((e) => {
    if (e.type === "message") {
      sendReplyMessage(e.replyToken, e.message.text);
    }
  });
  if (isError) {
    return {
      statusCode: 404,
      body: "Something wrong",
    };
  }
  return {
    statusCode: 200,
    body: "Hello World",
  };
};
