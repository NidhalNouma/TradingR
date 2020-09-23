import React from "react";
import Empty from "../asset/images/Empty";

function Noresult(props) {
  return (
    <div className="noResult" style={{ marginTop: props.margin }}>
      <Empty />
      <h5>Sorry No Result Founded</h5>
    </div>
  );
}

export default Noresult;
