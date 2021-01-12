import React, { useState, useContext } from "react";

import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Product from "./Product";

import { findSubs } from "../../Hooks/User";
import { UserC } from "../../Hooks/User";

function Myproducts(props) {
  const [sec, setSec] = useState(0);
  const [ind, setInd] = useState(null);
  const [str, setStr] = useState(null);
  const { user } = useContext(UserC);

  React.useEffect(() => {
    if (user) findSubs(user._id, setStr, setInd);
  }, [user]);

  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={props.link} />
        </div>
        <div className="right">
          <div className="profileproduct">
            <h5
              className={sec === 0 ? "active" : undefined}
              onClick={() => setSec(0)}
            >
              Strategys
            </h5>
            <h5
              className={sec === 1 ? "active" : undefined}
              onClick={() => setSec(1)}
            >
              Indicators
            </h5>
            {/* <h5
              className={sec === 2 ? "active" : undefined}
              onClick={() => setSec(2)}
            >
              Source
            </h5> */}
          </div>
          {sec === 0 && <Product type="Strategys" data={str} />}
          {sec === 1 && <Product type="Indicators" data={ind} />}
          {/* {sec === 2 && <Product type="Source" data={sou} />} */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Myproducts;
