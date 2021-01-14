import React, { useState, useEffect, useContext } from "react";

import { UserC, User, setLastTime } from "../component/Hooks/User";
import { Notification, NotifC } from "../component/Hooks/Notification";
import { SocketC } from "../component/Hooks/Socket";
import Signin from "../component/signIn";

import App from "../app";
import SetListNotif from "./SetListNotif";
import SetNotif from "./SetNotif";

function Notif() {
  const { onNot } = useContext(SocketC);
  const userCo = User();
  const user = userCo.user;
  const Notif = Notification();

  const [show, setShow] = useState(false);
  const [am, setam] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setMsg({
        msg: `Welcome ${user.userName}`,
        place: "center",
        duration: 3000,
      });

      Notif.setNotif(user.notifications);
      onNot(user._id, user.notifications, Notif.setNotif);
      setam(true);
      delete user.notifications;
      setLastTime(user ? user._id : undefined);
    }
  }, [user]);

  return (
    <>
      <NotifC.Provider value={Notif}>
        <UserC.Provider
          value={{
            user: userCo.user,
            setUser: userCo.setUser,
            check: user ? () => {} : setShow,
          }}
        >
          <App />
          <SetNotif am={am} setam={setam} msg={msg} />
          <SetListNotif lastTime={user && user.lastTime} />
          {show ? <Signin close={() => setShow(false)} show={show} /> : <></>}
        </UserC.Provider>
      </NotifC.Provider>
    </>
  );
}

export default Notif;
