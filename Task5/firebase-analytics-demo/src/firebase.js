import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyBhfW9yZk7R6titOPXPblTJik3AnfwEQ1Y",
  authDomain: "fir-web-app-171b8.firebaseapp.com",
  projectId: "fir-web-app-171b8",
  storageBucket: "fir-web-app-171b8.firebasestorage.app",
  messagingSenderId: "464309625818",
  appId: "1:464309625818:web:3b62d6cd9119262725d6e3",
  measurementId: "G-9VGR6L71GB"
};

const app = initializeApp(firebaseConfig);

// Analytics
export const analytics = getAnalytics(app);

// Remote Config
export const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 10000,
};

remoteConfig.defaultConfig = {
  showNewUI: false,
};

export default app;