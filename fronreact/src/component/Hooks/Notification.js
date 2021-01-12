import { useState, createContext } from "react";

export const Notification = () => {
  const [notif, setNotif] = useState(null);

  return { notif, setNotif };
};

export const NotifC = createContext(null);
