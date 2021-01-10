import React from "react";

import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Nonotify from "./Nonotify";
import NotifItem from "./NotifItem";

function Notification() {
  const notif = null;
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
              <div className="maarnotif">
                <span>Mark All As Read</span>
              </div>
              {notif.map((i) => (
                <NotifItem key={i._id} data={i} />
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
