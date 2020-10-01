import React from "react";
import axios from "axios";
import qs from "querystring";
import { useSelector, useDispatch } from "react-redux";

import UpArrow from "../../../../asset/images/UpArrow";
import DnArrow from "../../../../asset/images/dnArrow";
import Signin from "../../../signIn";

import { Plus, Minus, Emit } from "../../../../Actions";

function Vote({ up, dn, improId, productId, productImg, id, authId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const total = useSelector((state) => {
    const p = state.products.find((i) => i._id === productId);
    const pi = p.product.find((i) => i.product._id === id);
    const pp = pi.product.improvements.find((i) => i._id === improId);
    if (pp) return pp.plus.length - pp.minus.length;
    else return 0;
  });
  const [show, setShow] = React.useState(false);
  const closesign = () => {
    setShow(false);
  };

  const click = (type) => {
    if (user) {
      const endpoint =
        type === "1"
          ? "/api/product/add/impro/plus"
          : "/api/product/add/impro/minus";

      const data = qs.stringify({
        id: improId,
        userId: user._id,
        userName: user.username,
        productId: id,
        authId,
      });
      if (type === "1")
        dispatch(Plus({ userId: user.id, productId, improId, id }));
      else dispatch(Minus({ userId: user.id, productId, improId, id }));

      axios
        .post(endpoint, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(function (response) {
          const re = response.data.added;
          if (re) {
            dispatch(
              Emit({
                type: type,
                sub: {
                  userId: user.id,
                  productImg,
                  improId,
                  id,
                  productId,
                  authId,
                  userName: user.username,
                  img: productImg,
                },
              })
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    } else {
      setShow(true);
    }
  };
  return (
    <>
      <div className="vote">
        <button onClick={() => click("1")}>
          <UpArrow
            yes={up && user && up.find((i) => i === user.id) ? true : false}
          />
        </button>
        <span>{total ? total : 0}</span>
        <button onClick={() => click("-1")}>
          <DnArrow
            yes={dn && user && dn.find((i) => i === user.id) ? true : false}
          />
        </button>
      </div>
      {show ? <Signin close={closesign} show={show} /> : <></>}
    </>
  );
}

export default Vote;
