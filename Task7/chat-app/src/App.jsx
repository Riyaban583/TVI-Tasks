import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Chat from "./components/Chat";

import { auth } from "./firebase";

import {
  signInWithGoogle,
  logoutUser,
} from "./services/authService";

import { saveUserToFirestore } from "./services/userService";

import { generateFCMToken } from "./services/fcmService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    try {
      const permission =
        await Notification.requestPermission();

      if (permission === "granted") {
        console.log(
          "Notification Permission:",
          permission
        );

        await generateFCMToken();
      }
    } catch (error) {
      console.log(
        "Notification Error:",
        error
      );
    }
  };

  const handleLogin = async () => {
    try {
      const loggedInUser =
        await signInWithGoogle();

      await saveUserToFirestore(
        loggedInUser
      );

      setUser(loggedInUser);
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.log(
        "LOGOUT ERROR:",
        error
      );
    }
  };

  return (
    <div>
      <h1>Real Time Chat App</h1>

      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <Chat
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;