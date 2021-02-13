import Menu from "../component/menu";
import CreateProduct from "../component/addPeoduct";

function AddProduct({ ty, location }) {
  return (
    <>
      <Menu ty={location && location.type ? location.type : ty} />
      <div className="pContain">
        <CreateProduct
          ty={location && location.type ? location.type : ty}
          location={location}
        />
      </div>
      {/* <div className="sContain ml3">
        <CreateProduct />
      </div> */}
    </>
  );
}

export default AddProduct;
