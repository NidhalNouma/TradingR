import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import App from "../app";
import SetListNotif from "./SetListNotif";
import SetNotif from "./SetNotif";

function Notif() {
  const user = useSelector((state) => state.user);
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
      <App />
      <SetNotif am={am} setam={setam} msg={msg} />
      <SetListNotif />
    </>
  );
}

export default Notif;
