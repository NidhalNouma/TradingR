import React from "react";
import moment from "moment";
import Badge from "../Badge";

function PriceItem({ set, bg, val, data, ty, sub }) {
  const style = {
    backgroundColor: bg && "var(--tcolor)",
  };

  let tr = true;
  let end = null;
  if (sub && sub.length > 0) {
    sub.forEach((i) => {
      if ((i.price === data.id.m || i.price === data.id.y) && ty === 0) {
        tr = false;
        end = moment(i.end * 1000).format("MMMM Do YYYY"); //, h:mm:ss a
        if (bg) set(0);
      } else if ((i.price === data.id.m || i.price === data.id.y) && ty === 1) {
        tr = false;
        end = moment(i.end * 1000).format("MMMM Do YYYY");
        if (bg) set(0);
      }
    });
  }

  return (
    <div className="p1 pricing-item m1">
      <h4 className="h41 bold flex">
        {data.title} <Badge val={val} />
      </h4>
      <div className="mu1">
        <span className="spanR crossL mr-5">
          ${ty === 0 ? data.pMonth.fPrice : data.pYear.fPrice}
        </span>
        <span className="spanR mr-5">
          ${ty === 0 ? data.pMonth.lPrice : data.pYear.lPrice}
        </span>
        <span className="span bold">{ty === 0 ? "/month" : "/year"}</span>
      </div>
      <p className="p">
        <ul className="ul">
          {data.desc.map((i, ii) => (
            <li key={ii}>{i}</li>
          ))}
        </ul>
      </p>
      {tr ? (
        <button className="buttonR" style={style} onClick={() => set(val)}>
          {bg ? "Selected" : "Select"}
        </button>
      ) : (
        <>
          <span className="span bold">Current Plan</span>
          <br />
          {end && <span className="span1">Renew {end}</span>}
        </>
      )}
    </div>
  );
}

export default PriceItem;
