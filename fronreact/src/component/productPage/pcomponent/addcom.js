import React, { useState, useEffect, useContext, useRef } from "react";
import { TextareaAutosize } from "@material-ui/core";
import RightArrow from "../../../asset/images/rightArrow";
import Images from "../../../asset/images/Images";

import { AddCom, ProductC } from "../../Hooks/Products";
import { UserC } from "../../Hooks/User";
import { SocketC } from "../../Hooks/Socket";

function Addcom({ type, placeholder }) {
  const { p, setProduct } = useContext(ProductC);
  const user = useContext(UserC);
  const { socket } = useContext(SocketC);

  const comL = 50;
  const [com, setcom] = useState("");
  const [err, setErr] = useState("");
  const addt = type === "qa" ? "Ask any Qustion" : "Add your Improvement";
  const [add, setAdd] = useState(false);

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
      setErr(`Minimum ${comL} caracter`);
      return;
    }
    AddCom(type, user.user, com, p, setProduct, socket);
    setcom("");
    setAdd(false);
  };

  const [imgs, setImgs] = useState([]);
  const input = useRef(null);
  return (
    <>
      <div className="comment md1">
        <button
          onClick={() => {
            setAdd(!add);
            setErr("");
            setImgs([]);
          }}
          className={add ? "buttonX" : "button"}
        >
          {add ? "cancel" : addt}
        </button>
        {add && (
          <form>
            <TextareaAutosize
              className="textarea"
              aria-label="minimum height"
              rowsMin={1}
              value={com}
              onChange={(e) => setcom(e.target.value)}
              placeholder={placeholder}
              autoFocus
            />
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  input.current.click();
                }}
                style={{ backgroundColor: "var(--shcolor)" }}
                className="svg3 btnSend mr-5 md-5"
              >
                <Images />
                {imgs.length > 0 && (
                  <span className="spanN">{imgs.length}</span>
                )}
              </button>
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
            </div>
          </form>
        )}
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
        <input
          multiple
          ref={input}
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files;
            let arr = imgs;
            for (const i in f) {
              const fi = f[i];
              if (fi.size > 0) arr.push(fi);
            }
            setImgs([...arr]);
          }}
        />
      </div>
    </>
  );
}

export default Addcom;
