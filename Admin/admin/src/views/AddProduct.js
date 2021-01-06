import Menu from "../component/menu";
import CreateProduct from "../component/addPeoduct";

function AddProduct({ ty, type }) {
  return (
    <>
      <Menu ty={ty} />
      <div className="pContain">
        <CreateProduct ty={type} />
      </div>
      {/* <div className="sContain ml3">
        <CreateProduct />
      </div> */}
    </>
  );
}

export default AddProduct;
