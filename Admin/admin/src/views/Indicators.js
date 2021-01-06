import Menu from "../component/menu";
import ProductItem from "../component/ProductItem";
import { FindProducts } from "../Hooks/Product";
import { Link } from "react-router-dom";

function Indicators() {
  const { product } = FindProducts("Indicator");
  return (
    <>
      <Menu ty={3} />
      <div className="pContain">
        <Link to="/indicators/add" className="a buttonP pl1 pr1">
          Create New Indicator
        </Link>
        {product ? (
          product.map((i) => (
            <Link
              className="ac"
              key={i._id}
              to={{
                pathname: "/indicators/" + i._id,
                product: i,
                ty: 3,
              }}
            >
              <ProductItem p={i} />
            </Link>
          ))
        ) : (
          <h5>Loading ...</h5>
        )}
      </div>
    </>
  );
}

export default Indicators;
