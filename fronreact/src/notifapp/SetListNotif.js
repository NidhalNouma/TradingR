import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useSelector } from "react-redux";

function Notifl() {
  const notif = useSelector((state) => state.notif);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notif) {
      enqueueSnackbar("This is a success message!", { variant: "success" });
      enqueueSnackbar("I love snacks.");
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
