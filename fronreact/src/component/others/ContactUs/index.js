import React, { useState } from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
// import Freelancer from "../freelancer";
import Form from "./Form";
import Subject from "./Subject";

function ContacUs() {
  const [sel, setSel] = useState(-1);

  return (
    <>
      <Navbar here={true} />
      <div className="contactus">
        <h3 className="h4">Contact us</h3>
        <p className="pg1">
          Ex occaecat cillum ea cupidatat deserunt. Nostrud fugiat sint
          excepteur anim sint elit excepteur qui adipisicing laborum deserunt
          magna. Dolore adipisicing anim sunt occaecat. Laboris tempor magna
          velit dolore cupidatat ipsum labore Lorem excepteur nisi. Mollit ex
          mollit excepteur ex occaecat exercitation incididunt labore sit dolore
          tempor nostrud. Ea excepteur consectetur dolor et ea fugiat dolor id
          consequat. Esse consectetur fugiat mollit sit est labore incididunt.
        </p>

        <div className="subject-cont">
          <Subject t={"Have an idea"} i={0} set={setSel} s={sel} />
          <Subject t={"Payment"} i={1} set={setSel} s={sel} />
          <Subject t={"Instalation"} i={2} set={setSel} s={sel} />
          <Subject t={"Other"} i={3} set={setSel} s={sel} />
        </div>
        <div>{sel >= 0 && <Form i={sel} />}</div>
      </div>
      <Footer />
    </>
  );
}

export default ContacUs;
