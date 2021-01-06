import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
const time = new Date();

function Notifl() {
  const notif = null;
  // useSelector((state) => state.notif);
  const ref = null; // useSelector((state) => state.ref);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notif && notif.length > 0) {
      console.log(time);
      notif.map((i) => {
        if (!i.readed && i.new)
          enqueueSnackbar(i.message, { variant: "success" });
      });
    }
  }, [notif, ref]);

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
