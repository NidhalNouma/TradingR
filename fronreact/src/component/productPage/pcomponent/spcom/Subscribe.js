import React, { useEffect, useContext } from "react";

import Dialogalert from "../../../Dialogalert";
import { ProductC, SubscribeFn } from "../../../Hooks/Products";
import { UserC } from "../../../Hooks/User";
import { SocketC } from "../../../Hooks/Socket";

function Subscriber() {
  const [sub, setSub] = React.useState(false);
  const [des, setDes] = React.useState(false);
  const user = useContext(UserC);
  const { socket } = useContext(SocketC);
  const { p, setProduct } = useContext(ProductC);

  useEffect(() => {
    if (user.user) {
      if (p.subscribers.find((i) => i === user._id)) {
        setSub(true);
      }
    } else {
      setSub(false);
    }
  }, [user, p.subscribers]);

  return (
    <>
      <button
        className={sub ? "buttonT m0" : "buttonS m0"}
        onClick={() => {
          if (!user.user) {
            user.check(true);
          } else if (sub) {
            setDes(!des);
          } else {
            SubscribeFn(user.user._id, sub, p, setProduct, socket);
            setSub(!sub);
          }
        }}
      >
        {sub ? "Subscribed" : "Subscribe"}
      </button>
      <Dialogalert
        open={des}
        setOpen={() => setDes(!des)}
        agree={() => {
          SubscribeFn(user.user._id, sub, p, setProduct, socket);
          setSub(!sub);
          setDes(false);
        }}
      />
    </>
  );
}

export default Subscriber;
