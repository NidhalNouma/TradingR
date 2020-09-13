import React, { useEffect } from "react";
import Navbar from "../global/navbar";
import Productsection from "./productsection";
import Footer from "../global/footer";
import { useLocation } from "react-router-dom";

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
