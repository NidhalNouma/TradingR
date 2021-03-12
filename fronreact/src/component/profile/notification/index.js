import React, { useContext } from "react";

import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Nonotify from "./Nonotify";
import NotifItem from "./NotifItem";

import { NotifC } from "../../Hooks/Notification";
import { UserC } from "../../Hooks/User";

function Notification() {
  const { notif, markAsRead, markAllAsRead } = useContext(NotifC);
  const { user } = useContext(UserC);
  // console.log(notif);
  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={3} />
        </div>
        <div className="right">
          {notif && notif.length > 0 ? (
            <>
              <div className="maarnotif mu2 md1">
                <button
                  className="buttonT tHover"
                  onClick={() => markAllAsRead(user._id)}
                >
                  Mark All As Read
                </button>
              </div>
              {notif.map((i) => (
                <NotifItem
                  key={i._id}
                  data={i}
                  read={() => markAsRead(i._id, user._id)}
                />
              ))}
            </>
          ) : (
            <Nonotify />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notification;
