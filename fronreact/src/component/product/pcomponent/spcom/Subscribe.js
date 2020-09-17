import React, { useEffect } from "react";
import axios from "axios";
import qs from "querystring";
import { useDispatch, useSelector } from "react-redux";
import { Subscribe, Desubscribe } from "../../../../Actions";

function Subscriber({ setReff, product, id, sign }) {
  const dispatch = useDispatch();
  const [sub, setSub] = React.useState(false);
  const [des, setDes] = React.useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user)
      if (product.subscribers.find((i) => i === user._id)) {
        setSub(true);
      }
  }, [user, product, sub]);

  return (
    <>
      <a
        className={sub ? "unsb" : ""}
        onClick={() => {
          if (!user) {
            sign();
          } else if (sub) {
            setDes(!des);
          } else {
            request(sub, user._id, product._id, (res) => {
              dispatch(
                Subscribe({
                  productId: product._id,
                  userId: user._id,
                  id,
                })
              );
              setSub(!sub);
              setReff();
            });
          }
        }}
      >
        {sub ? "Subscribed" : "Subscribe"}
      </a>
      {des && (
        <span
          className="desub"
          onClick={() => {
            request(sub, user._id, product._id, (res) => {
              dispatch(
                Desubscribe({
                  productId: product._id,
                  userId: user._id,
                  id,
                })
              );
              setSub(!sub);
              setReff();
              setDes(false);
            });
          }}
        >
          Unsubscribe
        </span>
      )}
    </>
  );
}

export default Subscriber;

function request(sub, userId, productId, callback) {
  const endpoint = !sub
    ? "/api/product/productversion/subscriber"
    : "/api/product/productversion/dessubscriber";

  const data = qs.stringify({
    userId: userId,
    pvId: productId,
  });

  axios
    .post(endpoint, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
