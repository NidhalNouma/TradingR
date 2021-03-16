import React from "react";
import Empty from "../asset/images/Empty";

function Noresult(props) {
  return (
    <div className="noResult">
      <Empty />
      <h5>Sorry No Result Founded</h5>
    </div>
  );
}

export default Noresult;
