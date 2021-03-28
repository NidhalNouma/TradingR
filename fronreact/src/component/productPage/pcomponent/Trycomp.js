import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductC, DownloadFn } from "../../Hooks/Products";
import { UserC } from "../../Hooks/User";
import { SocketC } from "../../Hooks/Socket";

function Trycomp({ not, d, t }) {
  const { user, check } = useContext(UserC);
  const { socket } = useContext(SocketC);
  const { p, setProduct } = useContext(ProductC);

  const download = (e) => {
    DownloadFn(user ? user._id : undefined, p, setProduct, socket);
    window.open(d, "_self");
  };

  return (
    <div className="border m1 p-5 mu-5">
      <h5 className="h5 bold">
        {t ? "Testing Version" : "Production Version"}
      </h5>
      <p className="pg1">
        elit. Officiis asperiores, enim laboriosam iure nemo similique illo.
        Perspiciatis itaque velit, quod cumque nobis accusantium vel
      </p>
      {not ? (
        <p className="pgd">
          Subscribe{" "}
          <Link className="ah1 bold" to="/pricing">
            here
          </Link>{" "}
          to access this version
        </p>
      ) : (
        <>
          <button
            className={!not ? "buttonR" : "buttonR buttonNAN"}
            onClick={download}
          >
            Download
          </button>
        </>
      )}
    </div>
  );
}

export default Trycomp;
