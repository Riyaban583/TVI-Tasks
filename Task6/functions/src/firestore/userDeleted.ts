import { onDocumentDeleted } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

export const userDeleted = onDocumentDeleted(
  "users/{userId}",
  () => {
    logger.info("User Deleted");

    return;
  }
);