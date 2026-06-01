import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const helloWorld = onRequest((req, res) => {
  logger.info("HTTP Function Called");

  res.send("Hello from Firebase Functions!");
});