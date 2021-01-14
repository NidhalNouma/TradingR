import React, { useEffect, useContext, useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { NotifC } from "../component/Hooks/Notification";

function Notifl({ lastTime }) {
  const { notif } = useContext(NotifC);
  const { enqueueSnackbar } = useSnackbar();
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (notif && notif.length > 0) {
      notif.map((i) => {
        const tt = new Date(i.at).getTime();
        const ttu = new Date(lastTime).getTime();
        if (!i.readed && tt > time && tt > ttu)
          return enqueueSnackbar(
            Content(
              i.productId,
              i.message,
              i.fromId
            ) /*, { variant: "success" }*/
          );
        else return undefined;
      });
      setTime(new Date().getTime());
    }
  }, [notif]);

  return <></>;
}

export default function SetListNotif({ lastTime }) {
  return (
    <SnackbarProvider maxSnack={5}>
      <Notifl lastTime={lastTime} />
    </SnackbarProvider>
  );
}

const Content = (id, message, user) => (
  <div>
    <span style={{ margin: "0", color: "var(--scolor)" }}>
      {user ? user.userName : "New "} {message}
    </span>
    <a href={"/product/" + id} className="ml-5 an bold">
      see more
    </a>
  </div>
);
