import React from "react";
import { Link } from "react-router-dom";

export default function Releatedidea() {
  return (
    <div className="griditem">
      <Link to="/ideas/1">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRm2WUWHfABpoV-g_f4s7XPFrPfzYBS23a1RA&usqp=CAU"
          alt=""
        />
        <h5>Title</h5>
      </Link>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem enim
        tempora
      </p>
    </div>
  );
}
