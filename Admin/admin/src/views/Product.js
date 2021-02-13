import ProductView from "../component/ProductView";
import Menu from "../component/menu";

function Product({ location }) {
  return (
    <>
      <Menu ty={location.ty} />
      {location.product ? (
        <ProductView
          product={location.product.product}
          id={location.product._id}
          ty={location.ty}
        />
      ) : (
        <h5 style={{ textAlign: "center" }}>No Data!!!</h5>
      )}
    </>
  );
}

export default Product;
