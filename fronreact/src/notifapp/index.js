import React, { useState, useEffect } from "react";

import { UserC, User } from "../component/Hooks/User";
import { Notification, NotifC } from "../component/Hooks/Notification";
import Signin from "../component/signIn";

import App from "../app";
import SetListNotif from "./SetListNotif";
import SetNotif from "./SetNotif";

function Notif() {
  const userCo = User();
  const user = userCo.user;
  const Notif = Notification();

  const [show, setShow] = useState(false);
  const [am, setam] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user && !user.improvements) {
      setMsg({
        msg: `Welcome ${user.userName}`,
        place: "center",
        duration: 3000,
      });
      setam(true);
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
          <SetListNotif />
          {show ? <Signin close={() => setShow(false)} show={show} /> : <></>}
        </UserC.Provider>
      </NotifC.Provider>
    </>
  );
}

export default Notif;
