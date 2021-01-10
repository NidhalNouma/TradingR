import React, { useContext } from "react";
import Question from "../qanda/question";
import Addcom from "../addcom";
import { ProductC } from "../../../Hooks/Products";

function Impro() {
  const { p } = useContext(ProductC);
  return (
    <div className="qanda">
      <div>
        <Addcom placeholder="Add your improvement ..." type="impro" />
        <div className="commentsection">
          <div className="comments">
            {p.product.improvements
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
                  pId={p._id}
                  id={p.product._id}
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
