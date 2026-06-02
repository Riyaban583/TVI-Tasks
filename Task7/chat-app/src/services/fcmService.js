import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

const vapidKey =
  import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const generateFCMToken = async () => {
  try {
    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    console.log(
      "Service Worker Registered:",
      registration
    );

    const token = await getToken(
      messaging,
      {
        vapidKey,
        serviceWorkerRegistration: registration,
      }
    );

    console.log("FCM TOKEN:", token);

    return token;
  } catch (error) {
    console.log(
      "FCM TOKEN ERROR:",
      error
    );
  }
};