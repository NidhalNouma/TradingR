import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import qs from "querystring";

import Signin from "../../../signIn";
import { useSelector, useDispatch } from "react-redux";
import { AddImproAns, AddQaAns, Inc, Emit } from "../../../../Actions";
import { TextareaAutosize } from "@material-ui/core";
import RightArrow from "../../../../asset/images/rightArrow";

function Reply({ data, close, pvId }) {
  const comL = 20;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [com, setcom] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (com.length >= comL) {
      setErr("");
    }
  }, [com]);

  const submit = function (e) {
    e.preventDefault();
    if (!user) {
      setShow(true);
      return;
    }

    if (com.length < comL) {
      setErr("Minimum 15 caracter");
      return;
    }

    const date = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    setcom("");

    data.question
      ? dispatch(
          AddQaAns({
            id: data.productId,
            iid: data._id,
            pvId: pvId,
            data: {
              _id: date,
              userId: {
                username: user.username,
                userPicture: user.userPicture,
              },
              answer: com,
              productId: data._id,
              timestamp: date,
            },
          })
        )
      : dispatch(
          AddImproAns({
            id: data.productId,
            iid: data._id,
            pvId: pvId,
            data: {
              _id: date,
              userId: {
                username: user.username,
                userPicture: user.userPicture,
              },
              answer: com,
              productId: data._id,
              timestamp: date,
            },
          })
        );
    dispatch(Inc());
    close();

    const endpoint = data.question
      ? "/api/product/add/question/answer"
      : "/api/product/add/impro/answer";

    const dat = qs.stringify({
      id: data._id,
      productId: data.productId,
      userId: user._id,
      userName: user.username,
      userImg: "noImg",
      answer: com,
    });
    axios
      .post(endpoint, dat, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(function (response) {
        console.log(response);
        data.question
          ? dispatch(
              Emit({
                type: "qaAns",
                sub: {
                  id: data.productId,
                  iid: data._id,
                  pvId: pvId,
                  data: {
                    _id: date,
                    userId: {
                      username: user.username,
                      userPicture: user.userPicture,
                    },
                    answer: com,
                    productId: data._id,
                    timestamp: date,
                  },
                },
              })
            )
          : dispatch(
              Emit({
                type: "improAns",
                sub: {
                  id: data.productId,
                  iid: data._id,
                  pvId: pvId,
                  data: {
                    _id: date,
                    userId: {
                      username: user.username,
                      userPicture: user.userPicture,
                    },
                    answer: com,
                    productId: data._id,
                    timestamp: date,
                  },
                },
              })
            );
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };

  return (
    <>
      <div className="comment r-section">
        <form>
          <TextareaAutosize
            aria-label="minimum height"
            rowsMin={1}
            value={com}
            onChange={(e) => setcom(e.target.value)}
            placeholder="Reply ..."
            onKeyDown={(e) => {
              if (e.keyCode === 13 && !e.shiftKey) {
                submit(e);
                return;
              }
            }}
            autoFocus
          />
          <button
            onClick={submit}
            className={com.length >= comL ? "allow" : ""}
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
      {show ? <Signin close={() => setShow(false)} show={show} /> : <></>}
    </>
  );
}

export default Reply;
