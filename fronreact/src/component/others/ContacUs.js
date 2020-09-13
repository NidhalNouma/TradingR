import React from "react";

import Navbar from "../global/navbar";
import Footer from "../global/footer";
import Freelancer from "../freelancer";

function ContacUs() {
  return (
    <>
      <Navbar />
      <div className="contactus">
        <Freelancer />
        <Freelancer />
        <Freelancer />
        <Freelancer />
      </div>
      <Footer />
    </>
  );
}

export default ContacUs;
