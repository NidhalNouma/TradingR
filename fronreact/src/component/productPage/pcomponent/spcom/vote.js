import React, { useContext } from "react";

import UpArrow from "../../../../asset/images/UpArrow";
import DnArrow from "../../../../asset/images/dnArrow";

import { ProductC, improVote } from "../../../Hooks/Products";
import { UserC } from "../../../Hooks/User";
import { SocketC } from "../../../Hooks/Socket";

function Vote({ up, dn, improId, authId }) {
  const { p, setProduct } = useContext(ProductC);
  const user = useContext(UserC);
  const { socket } = useContext(SocketC);

  const total = (() => {
    const pp = p.product.improvements.find((i) => i._id === improId);
    if (pp) return pp.plus.length - pp.minus.length;
    else return 0;
  })();

  const click = (type) => {
    if (!user.user) {
      user.check(true);
    } else {
      improVote(type, user.user, improId, authId, p, setProduct, socket);
    }
  };

  return (
    <>
      <div className="svg3">
        <button onClick={() => click("1")} className="buttonT p0 mr-25">
          <UpArrow
            yes={up && user && up.find((i) => i === user.id) ? true : false}
          />
        </button>
        <span className="spanL ">{total ? total : 0}</span>
        <button onClick={() => click("-1")} className="buttonT p0 ml-25">
          <DnArrow
            yes={dn && user && dn.find((i) => i === user.id) ? true : false}
          />
        </button>
      </div>
    </>
  );
}

export default Vote;
