// NotificationService.js
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // Only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  // Get the token for the device
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token); // Send this token to your server to save it and use it for sending notifications

  return token;
};

// Function to handle displaying notifications
export const scheduleNotification = async (message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New Notification',
      body: message,
      sound: true,
      priority: 'high',
    },
    trigger: null, // Trigger immediately
  });
};
