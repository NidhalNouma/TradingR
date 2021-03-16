import React, { useContext } from "react";

import UpArrow from "../../../../asset/images/UpArrow";
import DnArrow from "../../../../asset/images/dnArrow";

import { ProductC, improVote } from "../../../Hooks/Products";
import { UserC } from "../../../Hooks/User";
import { SocketC } from "../../../Hooks/Socket";

function Vote({ up, dn, improId, authId }) {
  const { p, setProduct } = useContext(ProductC);
  const { user, check } = useContext(UserC);
  const { socket } = useContext(SocketC);

  const total = (() => {
    const pp = p.product.improvements.find((i) => i._id === improId);
    if (pp) return pp.plus.length - pp.minus.length;
    else return 0;
  })();

  const click = (type) => {
    if (!user) {
      check(true);
    } else {
      improVote(type, user, improId, authId, p, setProduct, socket);
    }
  };

  const uPu = user && up.find((i) => i === user._id);
  const dNu = user && dn.find((i) => i === user._id);

  return (
    <>
      <div className="svg3">
        <button
          onClick={() => {
            if (!uPu) click("1");
          }}
          className="buttonT p0 mr-25 svgHoverUp"
        >
          <UpArrow yes={up && uPu ? true : false} />
        </button>
        <span className="spanL ">{total ? total : 0}</span>
        <button
          onClick={() => {
            if (!dNu) click("-1");
          }}
          className="buttonT p0 ml-25 svgHoverDn"
        >
          <DnArrow yes={dn && dNu ? true : false} />
        </button>
      </div>
    </>
  );
}

export default Vote;
