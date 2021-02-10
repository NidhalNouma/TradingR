import React from "react";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function Acc({ d }) {
  return (
    <div>
      {d && <h5 className="h5">Active Accounts:</h5>}
      {d && d.length > 0 && d.map((i, ii) => <Item i={i} key={ii} />)}
    </div>
  );
}

export default Acc;

function Item({ i }) {
  return (
    <div className="flexB mu-5 md1 borderB pl1 pr1 pu-5 pd-5">
      <div className="flex">
        <span className="span2 bold">{i.title}</span>
        <span className="span1 ml1 mr1"> expire in {i.end} </span>
      </div>
      <RemoveCircleIcon
        style={{ fill: "var(--shcolor)", width: "16px", cursor: "pointer" }}
      />
    </div>
  );
}
