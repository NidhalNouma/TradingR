import React from "react";
import { Link } from "react-router-dom";
import Notification from "../../../asset/images/notification";

function Noprod() {
  return (
    <div className="cardno">
      <Notification />
      <span>You have No Notification</span>
    </div>
  );
}

export default Noprod;
