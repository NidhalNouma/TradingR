import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function ProductView({ product, ty, id }) {
  const [sel, setSel] = React.useState(0);
  const style = { background: "var(--scolor)" };
  return (
    <div className="pContain">
      <iframe
        className="iframe"
        title="Video Desc"
        src={"https://www.youtube.com/embed/" + product.media}
      ></iframe>
      <h4 className="h4">{product.title}</h4>
      <p className="parse">{parse(product.description)}</p>

      <div style={{ width: "100%" }} className="sdetails flexA">
        <span style={sel === 0 ? style : undefined} onClick={() => setSel(0)}>
          Results
        </span>
        <span style={sel === 1 ? style : undefined} onClick={() => setSel(1)}>
          Inputs
        </span>
        <span style={sel === 2 ? style : undefined} onClick={() => setSel(2)}>
          How to use
        </span>
        <span style={sel === 3 ? style : undefined} onClick={() => setSel(3)}>
          What's new
        </span>
      </div>

      <div id="de">
        <div className="chart parse">
          {sel === 0 ? (
            product.moreDes.results.map((i) => (
              <img className="img" src={i} alt="img" />
            ))
          ) : sel === 1 ? (
            <p className="pg1">{parse(product.moreDes.inputs)}</p>
          ) : sel === 2 ? (
            <p className="pg1">{parse(product.moreDes.howtouse)}</p>
          ) : (
            <p className="pg1">{parse(product.moreDes.whatsNew)}</p>
          )}
        </div>
      </div>
      <div className="mu1 md1">
        <Link
          to={{
            pathname: "/product/edit/" + id,
            product: product,
            type: ty,
            title: "Edit product",
            id,
            edit: true,
          }}
          className="buttonS mu1 mr1"
        >
          Edit
        </Link>
        <Link
          to={{
            pathname: "/product/newversion/" + id,
            product: product,
            type: ty,
            title: "Add new version",
            id,
            newVersion: true,
          }}
          className="buttonP mu1"
        >
          Add new version
        </Link>
      </div>
    </div>
  );
}

export default ProductView;
