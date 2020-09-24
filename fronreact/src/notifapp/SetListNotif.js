import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSelector } from "react-redux";
const time = new Date();

function Notifl() {
  const notif = useSelector((state) => state.notif);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notif && notif.length > 0) {
      console.log(time);
      // enqueueSnackbar("This is a success message!", { variant: "success" });
      notif.map((i) => {
        if (!i.readed) enqueueSnackbar(i.message);
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

// content={(key, message) => (
//     <div
//       style={{
//         backgroundColor: "var(--pcolor)",
//         borderRadius: "10px",
//         padding: ".3rem 1rem",
//         boxShadow: "0px 4px 18px var(--shcolor)",
//       }}
//     >
//       <span style={{ margin: "0", color: "var(--scolor)" }}>{message}</span>
//       <a>see More</a>
//     </div>
//   )}
