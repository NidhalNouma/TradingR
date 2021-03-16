import React from "react";
import Navbar from "../component/global/navbar";
import Footer from "../component/global/footer";

function HowWorks() {
  return (
    <>
      <Navbar here={true} />
      <div className="contain">
        <h3>How it Work</h3>
      </div>
      <Footer />
    </>
  );
}

export default HowWorks;
