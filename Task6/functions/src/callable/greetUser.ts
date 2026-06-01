import { onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const greetUser = onCall((request) => {
  const name = request.data.name || "User";

  logger.info(`User Name: ${name}`);

  return {
    success: true,
    message: `Hello ${name}!`,
  };
});