import React, { useContext } from "react";
import Details from "../pdetails";
import { ProductC } from "../../../Hooks/Products";

function Productdes() {
  const { p } = useContext(ProductC);
  return (
    <>
      <div className="pdetails">
        <iframe
          title="Video Desc"
          src={
            p
              ? "https://www.youtube.com/embed/" + p.product.media
              : "https://www.youtube.com/embed/CFO0amXDiaw"
          }
        ></iframe>
        <h4 className="h4 mu1 md1">{p ? p.product.title : "..... "}</h4>
        <p className="p md2">{p.product.description}</p>
        <Details />
      </div>
      <br />
    </>
  );
}

export default Productdes;
