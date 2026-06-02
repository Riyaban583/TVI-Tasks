import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

export const startNotificationListener = () => {
  onMessage(messaging, (payload) => {
    console.log(
      "Foreground Notification:",
      payload
    );

    alert(
      `${payload.notification.title}\n${payload.notification.body}`
    );
  });
};