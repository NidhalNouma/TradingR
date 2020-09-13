import React from "react";
import Templ from "./Templ";
import Quesimg from "../../asset/images/quest";
import Improvimg from "../../asset/images/improv";

function Dirtemp({ qa, data }) {
  return (
    <>
      <div>
        {qa ? (
          data && data.length > 0 ? (
            data.map((item) => <Templ key={data.indexOf(item)} data={item} />)
          ) : (
            <>
              <div className="noimqa">
                <Quesimg />
                <h5>You have no question</h5>
              </div>
            </>
          )
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <Templ key={data.indexOf(item)} data={item} vote={true} />
          ))
        ) : (
          <>
            <div className="noimqa">
              <Improvimg />
              <h5>You have no Improvement</h5>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dirtemp;
