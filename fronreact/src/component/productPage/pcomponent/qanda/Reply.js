import React, { useState, useEffect, useContext } from "react";

import { TextareaAutosize } from "@material-ui/core";
import RightArrow from "../../../../asset/images/rightArrow";

import { AddReply, ProductC } from "../../../Hooks/Products";
import { UserC } from "../../../Hooks/User";
import { SocketC } from "../../../Hooks/Socket";

function Reply({ data, close }) {
  const { p, setProduct } = useContext(ProductC);
  const user = useContext(UserC);
  const { socket } = useContext(SocketC);
  const comL = 20;
  const [com, setcom] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (com.length >= comL) {
      setErr("");
    }
  }, [com]);

  const submit = function (e) {
    e.preventDefault();
    if (!user.user) {
      user.check(true);
      return;
    }

    if (com.length < comL) {
      setErr("Minimum 15 caracter");
      return;
    }

    AddReply(
      data.question ? "qa" : "impro",
      data._id,
      user.user,
      com,
      data.userId._id,
      p,
      setProduct,
      socket
    );
    setcom("");
    close();
  };

  return (
    <>
      <div className="comment mu-5 ml2">
        <form>
          <TextareaAutosize
            className="textarea1"
            aria-label="minimum height"
            rowsMin={1}
            value={com}
            onChange={(e) => setcom(e.target.value)}
            placeholder="Reply ..."
            autoFocus
          />
          <button
            onClick={submit}
            className={
              com.length >= comL
                ? "svg3 btnSend allow mr-5 md-5"
                : " svg3 btnSend mr-5 md-5"
            }
          >
            <RightArrow />
          </button>
        </form>
        {err && (
          <span
            style={{
              display: "block",
              color: "red",
              margin: "2px 0",
              fontSize: "0.8rem",
            }}
          >
            {err}
          </span>
        )}
      </div>
    </>
  );
}

export default Reply;
