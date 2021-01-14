import React, { useEffect, useContext } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { NotifC } from "../component/Hooks/Notification";

function Notifl() {
  const { notif } = useContext(NotifC);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notif && notif.length > 0) {
      notif.map((i) => {
        if (!i.readed)
          return enqueueSnackbar(
            Content(i.productId, i.message) /*, { variant: "success" }*/
          );
        else return undefined;
      });
    }
  }, [notif]);

  return <></>;
}

export default function SetListNotif() {
  return (
    <SnackbarProvider maxSnack={5}>
      <Notifl />
    </SnackbarProvider>
  );
}

const Content = (id, message) => (
  <div>
    <span style={{ margin: "0", color: "var(--scolor)" }}>{message}</span>
    <a href={"/product/" + id} className="ml-5 an bold">
      see more
    </a>
  </div>
);
