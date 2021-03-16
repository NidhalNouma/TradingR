import React, { useState, useEffect, useContext } from "react";

import { UserC, User, setLastTime } from "../component/Hooks/User";
import { Notification, NotifC } from "../component/Hooks/Notification";
import { SocketC } from "../component/Hooks/Socket";
import Signin from "../component/signIn";
import Resetpassword from "../component/signIn/Resetpassword";

import App from "../app";
import SetListNotif from "./SetListNotif";
import SetNotif from "./SetNotif";

function Notif() {
  const { onNot } = useContext(SocketC);
  const [show, setShow] = useState(false);
  const [resetShow, setRShow] = useState({ show: false, email: null });
  const { user, setUser } = User(setRShow);
  const Notif = Notification();

  const [am, setam] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user) {
      if (monthDiff(new Date(), new Date(user.lastTime)) > 0)
        setMsg({
          msg: `Welcome back ${user.userName}`,
          place: "center",
          duration: 3000,
        });
      if (!Notif.notif) {
        Notif.setNotif(user.notifications);
        onNot(user._id, user.notifications, Notif.setNotif);
        setam(true);
        delete user.notifications;
        setLastTime(user ? user._id : undefined);
      }
    }
  }, [user]);

  return (
    <>
      <NotifC.Provider value={Notif}>
        <UserC.Provider
          value={{
            user: user,
            setUser: setUser,
            check: user ? () => {} : setShow,
          }}
        >
          <App />
          <SetNotif am={am} setam={setam} msg={msg} />
          <SetListNotif lastTime={user && user.lastTime} />
          {show ? <Signin close={() => setShow(false)} show={show} /> : <></>}
          <Resetpassword
            show={resetShow.show}
            close={() => setRShow({ ...resetShow, show: false })}
            email={resetShow.email}
            setShow={setShow}
          />
        </UserC.Provider>
      </NotifC.Provider>
    </>
  );
}

export default Notif;

function monthDiff(d1, d2) {
  if (!d1 || !d2) return 0;
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}
