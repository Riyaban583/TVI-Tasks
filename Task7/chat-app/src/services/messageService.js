import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

export const sendMessage = async (text, user) => {
  await addDoc(collection(db, "messages"), {
    text,
    uid: user.uid,
    name: user.displayName,
    timestamp: serverTimestamp(),
  });
};

export const subscribeToMessages = (callback) => {
  const q = query(
    collection(db, "messages"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });
};