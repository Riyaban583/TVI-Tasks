import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

export const logMessageSent = () => {
  logEvent(analytics, "message_sent");
};