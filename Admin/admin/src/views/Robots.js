import Menu from "../component/menu";
import ProductItem from "../component/ProductItem";
import { FindProducts } from "../Hooks/Product";
import { Link } from "react-router-dom";

function Robots() {
  const url = process.env.REACT_APP_URL;
  const { product } = FindProducts("EA");

  return (
    <>
      <Menu ty={2} />
      <div className="pContain">
        <Link to={url + "/robots/add"} className="a buttonP pl1 pr1">
          Create New Robot
        </Link>
        {product ? (
          product.map((i) => (
            <Link
              className="ac"
              key={i._id}
              to={{
                pathname: url + "/robots/" + i._id,
                product: i,
                ty: 2,
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

export default Robots;
