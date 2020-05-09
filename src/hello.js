import { isLineSignature } from "./line/xLineSignature";

exports.handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  if (!isLineSignature(event.body, event.headers["x-line-signature"])) {
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
