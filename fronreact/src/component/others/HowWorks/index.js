import React from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Div from "./Div";

function HowWorks() {
  window.scrollTo(0, 0);

  return (
    <>
      <Navbar here={true} />
      <div className="contain">
        <Div n={1} t={"Introduction"} />
        <Div n={2} t={"Overview"} />
        <Div n={3} t={"Install"} />
        <Div n={4} t={"Start"} />
      </div>
      <Footer />
    </>
  );
}

export default HowWorks;
