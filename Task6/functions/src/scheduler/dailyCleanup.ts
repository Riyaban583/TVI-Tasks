import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";

export const dailyCleanup = onSchedule(
  "every 24 hours",
  async () => {
    logger.info("Daily Cleanup Started");

    // cleanup logic

    logger.info("Daily Cleanup Completed");
  }
);