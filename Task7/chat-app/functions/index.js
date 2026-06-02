const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotificationOnMessage =
onDocumentCreated(
    "messages/{messageId}",
    async (event) => {
      const messageData = event.data.data();

      const usersSnapshot =
      await admin.firestore()
          .collection("users")
          .get();

      const tokens = [];

      usersSnapshot.forEach((doc) => {
        const user = doc.data();

        if (user.fcmToken) {
          tokens.push(user.fcmToken);
        }
      });

      if (tokens.length === 0) {
        console.log("No FCM Tokens Found");
        return;
      }

      const payload = {
        notification: {
          title: `New Message from ${messageData.name}`,
          body: messageData.text,
        },
      };

      await admin.messaging().sendEachForMulticast({
        tokens,
        notification: payload.notification,
      });

      console.log("Notification Sent");
    }
);