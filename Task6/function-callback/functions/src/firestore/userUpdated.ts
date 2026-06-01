import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";

export const userUpdated = onDocumentUpdated(
  "users/{userId}",
  (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    logger.info("User Updated");
    logger.info("Before:", before);
    logger.info("After:", after);

    return;
  }
);