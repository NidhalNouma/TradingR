import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import qs from "querystring";
import Signin from "../../signIn";
import { TextareaAutosize } from "@material-ui/core";
import RightArrow from "../../../asset/images/rightArrow";
import { AddImpro, AddQa, ChImproId, Emit, Inc } from "../../../Actions";

function Addcom(props) {
  const comL = 50;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [com, setcom] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const addt = props.type === "qa" ? "Ask any Qustion" : "Add your Improvement";
  const [add, setAdd] = useState(false);

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
      setErr(`Minimum ${comL} caracter`);
      return;
    }

    const date = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    setcom("");
    setAdd(false);

    props.type === "qa"
      ? dispatch(
          AddQa({
            pId: props.pId,
            id: props.id,
            data: {
              _id: date,
              userId: {
                username: user.username,
                userPicture: user.userPicture,
              },
              question: com,
              answers: [],
              productId: props.id,
              timestamp: date,
            },
          })
        )
      : dispatch(
          AddImpro({
            pId: props.pId,
            id: props.id,
            data: {
              _id: date,
              userId: {
                username: user.username,
                userPicture: user.userPicture,
              },
              improvement: com,
              answers: [],
              productId: props.id,
              minus: [],
              plus: [],
              timestamp: date,
            },
          })
        );
    dispatch(Inc());

    const endpoint =
      props.type === "qa"
        ? "/api/product/add/question"
        : "/api/product/add/impro";

    const data =
      props.type === "qa"
        ? qs.stringify({
            id: props.id,
            userId: user._id,
            userName: user.username,
            userImg: "noImg",
            question: com,
          })
        : qs.stringify({
            id: props.id,
            userId: user._id,
            userName: user.username,
            userImg: "noImg",
            impro: com,
          });

    axios
      .post(endpoint, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(function (response) {
        const imId = response.data.improId;
        if (props.type !== "qa") {
          dispatch(
            ChImproId({
              pId: props.pId,
              id: props.id,
              dId: date,
              improId: imId,
            })
          );
          dispatch(Inc());
        }
        props.type === "qa"
          ? dispatch(
              Emit({
                type: props.type,
                sub: {
                  pId: props.pId,
                  id: props.id,
                  type: props.type,
                  data: {
                    _id: imId,
                    userId: {
                      username: user.username,
                      userPicture: user.userPicture,
                    },
                    question: com,
                    answers: [],
                    productId: props.id,
                    timestamp: date,
                  },
                },
              })
            )
          : dispatch(
              Emit({
                type: props.type,
                sub: {
                  pId: props.pId,
                  id: props.id,
                  type: props.type,
                  data: {
                    _id: imId,
                    userId: {
                      username: user.username,
                      userPicture: user.userPicture,
                    },
                    improvement: com,
                    answers: [],
                    productId: props.id,
                    minus: [],
                    plus: [],
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
      <div className="comment">
        <h6
          onClick={() => {
            setAdd(!add);
            setErr("");
          }}
          className={add ? "hcancel" : ""}
        >
          {add ? "cancel" : addt}
        </h6>
        {add && (
          <form>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={1}
              value={com}
              onChange={(e) => setcom(e.target.value)}
              placeholder={props.placeholder}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  submit(e);
                  return;
                }
              }}
              autoFocus
            />
            <button onClick={submit} className={com.length >= comL && "allow"}>
              <RightArrow />
            </button>
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
      </div>

      {show ? <Signin close={() => setShow(false)} show={show} /> : <></>}
    </>
  );
}

export default Addcom;
