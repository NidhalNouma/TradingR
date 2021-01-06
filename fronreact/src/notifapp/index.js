import React, { useState, useEffect } from "react";

import { UserC, User } from "../component/Hooks/User";
import Signin from "../component/signIn";

import App from "../app";
import SetListNotif from "./SetListNotif";
import SetNotif from "./SetNotif";

function Notif() {
  const userCo = User();
  const [show, setShow] = useState(false);

  const user = userCo.user;
  const [am, setam] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (user && !user.improvements) {
      setMsg({
        msg: `Welcome back ${user.username}`,
        place: "center",
        duration: 3000,
      });
      setam(true);
    }
  }, [user]);

  return (
    <>
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
    </>
  );
}

export default Notif;
