import React, { useState, useEffect, useContext, useRef } from "react";
import { TextareaAutosize } from "@material-ui/core";
import RightArrow from "../../../asset/images/rightArrow";
import Images from "../../../asset/images/Images";
import Imgs from "./imgs/Imgs";

import { AddCom, ProductC } from "../../Hooks/Products";
import { UserC } from "../../Hooks/User";
import { SocketC } from "../../Hooks/Socket";

import { uploadImg64 } from "../../Hooks/Firebase";

function Addcom({ type, placeholder, setLoad }) {
  const { p, setProduct } = useContext(ProductC);
  const user = useContext(UserC);
  const { socket } = useContext(SocketC);

  const comL = 50;
  const [com, setcom] = useState("");
  const [err, setErr] = useState("");
  const addt = type === "qa" ? "Ask any Qustion" : "Add your Improvement";
  const [add, setAdd] = useState(false);

  const [imgs, setImgs] = useState([]);
  const input = useRef(null);

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

    const lImgs = imgs;

    setLoad({
      id: p._id,
      pId: p.product._id,
      userId: user.user,
      question: com,
      impro: com,
      imgs: lImgs,
      answers: [],
      timestamps: new Date().toString(),
    });
    setcom("");
    setAdd(false);
    setImgs([]);

    if (lImgs.length > 0) {
      let fimgs = [];
      for (let i in lImgs) {
        uploadImg64(lImgs[i], user.user.userName, function (url) {
          fimgs.push(url);
          console.log(fimgs);
          // TO-DO add imgs to post request
          if (lImgs.length === fimgs.length) {
            AddCom(type, user.user, com, p, fimgs, setProduct, socket);
            // setcom("");
            // setAdd(false);
            // setImgs([]);
            setLoad({});
          }
        });
      }
    } else {
      AddCom(type, user.user, com, p, [], setProduct, socket);
      // setcom("");
      // setAdd(false);
      setLoad({});
    }
  };

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
              if (fi.size > 0) {
                const reader = new FileReader();
                reader.readAsDataURL(fi);
                reader.onloadend = (e) => {
                  arr.push(reader.result);
                  setImgs([...arr]);
                };
              }
            }
          }}
        />
      </div>
      {imgs.length > 0 && <Imgs imgs={imgs} set={setImgs} upl={true} />}
    </>
  );
}

export default Addcom;
