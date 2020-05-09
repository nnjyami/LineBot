import { isLineSignature } from "./line/xLineSignature";
import sendReplyMessage from "./line/sendReplyMessage";

exports.handler = async (event, context) => {
  let isError = false;
  if (!isLineSignature(event.body, event.headers["x-line-signature"])) {
    isError = true;
  }
  const events = JSON.parse(event.body).events;
  if (!events) isError = true;
  const fetchedPromise = Promise.all(
    events.map((ev) => sendReplyMessage(ev.replyToken, ev.message.text))
  ).catch((error) => {
    console.log("Error- Promise.all", error);
    isError = true;
  });
  if (isError) {
    console.log("Error", events);
    return {
      statusCode: 404,
      body: "Something wrong",
    };
  } else if (events.length === fetchedPromise.length) {
    return {
      statusCode: 200,
      body: "Hello World",
    };
  }
};
