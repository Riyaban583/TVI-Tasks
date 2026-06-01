import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

export const newUserTrigger = onDocumentCreated(
  "users/{userId}",
  (event) => {
    const user = event.data?.data();

    logger.info("New User Added");
    logger.info(user);

    return;
  }
);