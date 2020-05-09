const crypto = require("crypto");
const channelSecret = "0087c314abe553fab66cc4eb05b12fc0"; // Channel secret string

export const isLineSignature = (body, xLineSignature) => {
  const signature = crypto
    .createHmac("SHA256", channelSecret)
    .update(body)
    .digest("base64");
  return signature === xLineSignature;
};
