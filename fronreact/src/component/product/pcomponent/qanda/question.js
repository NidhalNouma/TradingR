import React, { useState } from "react";
import Ans from "./ans";
import Reply from "./Reply";
import Vote from "../spcom/vote";
import UserImg from "../../../../asset/images/UserImg";

function Question({ data, vote, pId, id }) {
  const answ = data.answers.sort((a, b) => {
    if (b.timestamp < a.timestamp) return -1;
    else if (b.timestamp > a.timestamp) return 1;
    else return 0;
  });
  const [r, setR] = useState(false);
  const [s, setS] = useState(false);
  const time = new Date(data.timestamp);
  return (
    <>
      <div className="question">
        <div className="top">
          <div className="det">
            {data.userId.userPicture && data.userId.userPicture !== "noimg" ? (
              <img src={data.userId.userPicture} alt="" />
            ) : (
              <UserImg />
            )}
            <h4>{data.userId.username}</h4>
          </div>
          {vote && (
            <Vote
              up={data.plus}
              dn={data.minus}
              improId={data._id}
              id={id}
              productId={pId}
            />
          )}
        </div>
        <div className="txt">
          {data && <p>{data.improvement}</p>}
          {data && <p>{data.question}</p>}
          <div className="reply-section">
            <i>
              {time.getDate() +
                " /" +
                time.getMonth() +
                " /" +
                time.getFullYear() +
                " -- " +
                time.getHours() +
                ":" +
                time.getMinutes()}
            </i>
            {r ? (
              <span
                style={{ color: "rgb(170 160 32)" }}
                onClick={() => setR(!r)}
              >
                Cancel
              </span>
            ) : (
              <span onClick={() => setR(!r)}>
                {data.improvement ? "Reply" : "Answer"}
              </span>
            )}
          </div>

          {r && <Reply data={data} pvId={pId} close={() => setR(false)} />}

          {data.answers && answ.length > 0 && <hr />}
          {s && data
            ? answ.map((item) => <Ans key={item._id} data={item} />)
            : answ.length > 0 && <Ans key={answ[0]._id} data={answ[0]} />}

          {data.answers && answ.length > 1 && (
            <span className="view-all" onClick={() => setS(!s)}>
              {s ? "Hide" : "View"} all Answers
            </span>
          )}
          <br />
        </div>
      </div>
    </>
  );
}

export default Question;
