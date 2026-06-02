export const requestNotificationPermission = async () => {
  try {
    const permission =
      await Notification.requestPermission();

    console.log("Notification Permission:", permission);

    return permission;
  } catch (error) {
    console.log(error);
  }
};