import parse from "html-react-parser";
function ProductItem({ p }) {
  return (
    <>
      <div className="product-item">
        <h5 className="h5 md-25">{p.product.title}</h5>
        <p className="pgl2 parse1">{parse(p.product.description)}</p>
        <span className="span mr1">subscribers: {p.sub.length}</span>
        <span className="span mr1">Downloads: {p.downloads.length}</span>
        <span className="span1"> {p.ps.length} Version</span>
      </div>
    </>
  );
}

export default ProductItem;
