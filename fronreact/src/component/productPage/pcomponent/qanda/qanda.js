import React, { useContext, useState } from "react";
import Question from "./question";
import Addcom from "../addcom";
import { ProductC } from "../../../Hooks/Products";

function Qanda() {
  const { p } = useContext(ProductC);
  const [load, setLoad] = useState({});

  return (
    <div className="qanda">
      <div>
        <Addcom
          placeholder="Ask any Question ..."
          type="qa"
          setLoad={setLoad}
        />
        <div className="commentsection">
          {load && load.id && <Upload data={load} p={p} />}
          <div className="comments">
            {p.product.qandas
              .sort((a, b) => {
                if (b.timestamp < a.timestamp) return -1;
                else if (b.timestamp > a.timestamp) return 1;
                else return 0;
              })
              .map((item) => (
                <Question
                  key={item._id}
                  data={item}
                  pId={p.product._id}
                  id={p._id}
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

function Upload({ data, p }) {
  return (
    <div className="comments op">
      <Question data={data} pId={p.product._id} id={p._id} />
    </div>
  );
}
