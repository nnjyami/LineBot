import { isLineSignature } from "./line/xLineSignature";
import sendReplyMessage from "./line/sendReplyMessage";

exports.handler = async (event, context) => {
  let isError = false;
  console.log("event", event);
  console.log("context", context);
  if (!isLineSignature(event.body, event.headers["x-line-signature"])) {
    isError = true;
  }
  const events = JSON.parse(event.body).events;
  console.log(events);
  if (!events) isError = true;
  events.forEach((ev) => {
    if (ev.type === "message") {
      sendReplyMessage(ev.replyToken, ev.message.text);
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
