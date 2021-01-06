import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Ans from "./ans";
import Reply from "./Reply";
import Vote from "../spcom/vote";
import UserImg from "../../../../asset/images/UserImg";

function Question({ data, vote, pId, id, pImg }) {
  const answ = data.answers.sort((a, b) => {
    if (b.timestamp < a.timestamp) return -1;
    else if (b.timestamp > a.timestamp) return 1;
    else return 0;
  });

  const [r, setR] = useState(false);
  const [s, setS] = useState(false);

  return !data.userId ? (
    <></>
  ) : (
    <>
      <div className="border1">
        <div className="flexB">
          <Link to="" className="flex ah">
            {data.userId.userPicture && data.userId.userPicture !== "noimg" ? (
              <img className="imgP1" src={data.userId.userPicture} alt="" />
            ) : (
              <UserImg />
            )}
            <h5 className="h51 ml-5">{data.userId.userName}</h5>
          </Link>
          {vote && (
            <Vote
              up={data.plus}
              dn={data.minus}
              improId={data._id}
              authId={data.userId._id}
            />
          )}
        </div>
        <div className="mu-5 ml1">
          {data && <p className="pg1 ml1 mu-5 md-5">{data.improvement}</p>}
          {data && <p className="pg1 ml1 mu-5 md-5">{data.question}</p>}
          <div className="flexB">
            <i className="i">{moment(new Date(data.timestamp)).fromNow()}</i>
            {r ? (
              <button className="buttonX" onClick={() => setR(!r)}>
                Cancel
              </button>
            ) : (
              <button className="buttonT" onClick={() => setR(!r)}>
                {data.improvement ? "Reply" : "Answer"}
              </button>
            )}
          </div>

          {r && <Reply data={data} pvId={pId} close={() => setR(false)} />}

          {data.answers && answ.length > 0 && <div className="hr ml2"></div>}
          {s && data
            ? answ.map((item) => <Ans key={item._id} data={item} />)
            : answ.length > 0 && <Ans key={answ[0]._id} data={answ[0]} />}

          {data.answers && answ.length > 1 && (
            <button className="buttonT md1" onClick={() => setS(!s)}>
              {s ? "Hide" : "View"} all Answers
            </button>
          )}
          <br />
        </div>
      </div>
    </>
  );
}

export default Question;