import React from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";

function Setting() {
  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={4} />
        </div>
        <div className="right"></div>
      </div>
      <Footer />
    </>
  );
}

export default Setting;
