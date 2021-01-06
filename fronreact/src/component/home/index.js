import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../global/navbar";
import Productsection from "./productsection";
import Footer from "../global/footer";

function Home() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar here={true} />
      <div className="containh">
        <Productsection />
      </div>
      <Footer />
    </>
  );
}

export default Home;
