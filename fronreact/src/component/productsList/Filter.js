import React, { useState } from "react";

function Filter() {
  const sty = "aspan bold";
  const styl = "aspan bold btn-line";
  const [subf, setSubf] = useState({
    free: true,
    basic: true,
    pro: true,
    primium: true,
  });

  const styv = "span1 cursor";
  const stylv = "span1 cursor btn-line";
  const [av, setAv] = useState({ MT4: true, MT5: true });

  return (
    <div className="filterP">
      {/* <span className="span">By Subscription:</span>
      <ul className="md2">
        <li className="flex md-5">
          <span
            className={subf.free ? sty : styl}
            onClick={() => setSubf({ ...subf, free: !subf.free })}
          >
            Free
          </span>
        </li>
        <li className="flex md-5">
          <span
            className={subf.basic ? sty : styl}
            onClick={() => setSubf({ ...subf, basic: !subf.basic })}
          >
            Basic
          </span>
        </li>
        <li className="flex md-5">
          <span
            className={subf.pro ? sty : styl}
            onClick={() => setSubf({ ...subf, pro: !subf.pro })}
          >
            Pro
          </span>
        </li>
        <li className="flex">
          <span
            className={subf.primium ? sty : styl}
            onClick={() => setSubf({ ...subf, primium: !subf.primium })}
          >
            Primium
          </span>
        </li>
      </ul> */}

      <span className="span">Available On:</span>
      <ul>
        <li className="flex md-5">
          <span
            className={av.MT4 ? styv : stylv}
            onClick={() => setAv({ ...av, MT4: !av.MT4 })}
          >
            MT4
          </span>
        </li>
        <li className="flex">
          <span
            className={av.MT5 ? styv : stylv}
            onClick={() => setAv({ ...av, MT5: !av.MT5 })}
          >
            MT5
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
