importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBhfW9yZk7R6tit0PXPblTJik3AnfwEQ1Y",
  authDomain: "fir-web-app-171b8.firebaseapp.com",
  projectId: "fir-web-app-171b8",
  storageBucket: "fir-web-app-171b8.firebasestorage.app",
  messagingSenderId: "464309625818",
  appId: "1:464309625818:web:3b62d6cd9119262725d6e3",
});

const messaging = firebase.messaging();