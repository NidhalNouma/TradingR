import React from "react";
import { Link } from "react-router-dom";
import Parse from "html-react-parser";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Trynow from "../../productPage/pcomponent/Trynow";

function ProdItem({ data }) {
  const [trynow, setTrynow] = React.useState(false);
  return (
    <>
      <div className="contprod">
        <img src={data.products[0].img} alt="productImg" />
        <div>
          <h5 className="h5">{data.products[0].title}</h5>
          <p className="parse1 pgl2">{Parse(data.products[0].description)}</p>
          <div className="mu1 flexB">
            <button onClick={(e) => setTrynow(true)} className="buttonP m0 mr1">
              Download
            </button>
            <Link
              className="buttonT m0 flexC scaleH"
              to={"/product/" + data._id}
            >
              <span>View product</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
      <Trynow trynow={trynow} setTrynow={setTrynow} />
    </>
  );
}

export default ProdItem;
