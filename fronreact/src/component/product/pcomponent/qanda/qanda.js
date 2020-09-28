import React from "react";
import Question from "./question";
import Addcom from "../addcom";

function Qanda({ data, id, pId, pImg }) {
  var q = [];
  for (var i = 0; i < 10; i++) {
    q.push(<Question key={i} />);
  }

  return (
    <div className="qanda">
      <div>
        <Addcom
          placeholder="Ask any Question ..."
          type="qa"
          id={id}
          pId={pId}
        />
        <div className="commentsection">
          <div className="comments">
            {data
              .sort((a, b) => {
                if (b.timestamp < a.timestamp) return -1;
                else if (b.timestamp > a.timestamp) return 1;
                else return 0;
              })
              .map((item) => (
                <Question
                  key={item._id}
                  data={item}
                  pId={pId}
                  id={id}
                  pImg={pImg}
                />
              ))}
          </div>
        </div>
        {/* <a className="readmore">Read more ...</a> */}
      </div>
    </div>
  );
}

export default Qanda;
