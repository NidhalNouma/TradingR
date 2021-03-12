import { useState, createContext } from "react";
import axios from "axios";

export const Notification = () => {
  const [notif, setNotif] = useState(null);

  const markAsRead = (id, userId) => {
    setNotif(
      notif.map((i) => {
        if (i._id === id && !i.read) {
          i.read = true;
          axios.post("/api/user/notification/markasread", { id, userId });
        }
        return i;
      })
    );
  };

  const markAllAsRead = (userId) => {
    if (unreadExist()) {
      setNotif(notif.map((i) => ({ ...i, read: true })));
      axios.post("/api/user/notifications/markallasread", { userId });
    }
  };

  const unreadExist = () => {
    let r = false;
    if (notif?.length > 0)
      notif.forEach((i) => {
        if (!i.read) r = true;
      });

    return r;
  };

  return { notif, setNotif, markAsRead, markAllAsRead, unreadExist };
};

export const NotifC = createContext(null);
