import React from "react";
import Question from "../qanda/question";
import Addcom from "../addcom";

function Impro({ data, id, pId }) {
  return (
    <div className="qanda">
      <div>
        <Addcom
          placeholder="Add your improvement ..."
          id={id}
          type="impro"
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
                  vote={true}
                  data={item}
                  pId={pId}
                  key={item._id}
                  id={id}
                />
              ))}
          </div>
        </div>
        {/* <a className="readmore">Read more ...</a> */}
      </div>
    </div>
  );
}

export default Impro;
