import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveUserToFirestore = async (
  user,
  fcmToken = null
) => {
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      fcmToken: fcmToken,
    },
    { merge: true }
  );
};