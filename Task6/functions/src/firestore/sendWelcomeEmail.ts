import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourmail@gmail.com",
    pass: "APP_PASSWORD",
  },
});

export const sendWelcomeEmail = onDocumentCreated(
  "users/{userId}",
  async (event) => {
    const user = event.data?.data();

    if (!user?.email) {
      logger.error("Email not found");
      return;
    }

    await transporter.sendMail({
      from: "yourmail@gmail.com",
      to: user.email,
      subject: "Welcome",
      text: `Hello ${user.name}, Welcome to our platform!`,
    });

    logger.info(`Email sent to ${user.email}`);
  }
);