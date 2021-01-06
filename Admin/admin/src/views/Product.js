import Menu from "../component/menu";

function Product({ location }) {
  console.log(location);
  return (
    <>
      <Menu ty={location.ty} />
      <div className="pContain">
        {location.product ? (
          JSON.stringify(location.product)
        ) : (
          <h5>No Data!!!</h5>
        )}
      </div>
    </>
  );
}

export default Product;
