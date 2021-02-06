import React from "react";

function PriceItem({ set, bg, val, data, ty }) {
  const style = {
    backgroundColor: bg && "var(--tcolor)",
  };
  return (
    <div className="p1 pricing-item m1">
      <h4 className="h41 bold">{data.title}</h4>
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
      <button className="buttonR" style={style} onClick={() => set(val)}>
        Select
      </button>
    </div>
  );
}

export default PriceItem;
