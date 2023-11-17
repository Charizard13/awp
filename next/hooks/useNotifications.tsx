"use client";

async function openNotificationsDialog() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
}

export default function useNotifications() {
  return { openNotificationsDialog };
}
