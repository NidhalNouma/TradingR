import React from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Nonotify from "./Nonotify";

function Notification() {
  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={3} />
        </div>
        <div className="right">
          <Nonotify />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notification;
