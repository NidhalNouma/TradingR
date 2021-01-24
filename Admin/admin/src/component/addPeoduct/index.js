import { uploadFile } from "../../Hooks/FireBase";
import { PostProduct } from "../../Hooks/Product";
// import TextEditor from "./TextEditor";
// import TEditor from "./TEditor";
// import MyText from "./MyText";
import SunText from "./SunText";

function CreateProduct({ ty }) {
  const {
    post,
    postP,
    data,
    setTitle,
    setDescription,
    setVersion,
    setMT4,
    setMT5,
    setTV,
    setImg,
    setMedia,
  } = PostProduct(ty);

  return (
    <>
      <h4 className="h4 md2">Create new product </h4>
      <input
        type="text"
        className="inputT"
        placeholder="Product Title"
        value={data.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="Youtube Viideo Embed"
        value={data.media}
        onChange={(e) => setMedia(e.target.value)}
      />
      {data.media && (
        <iframe
          className="ml1 iframe"
          title="Video Desc"
          src={"https://www.youtube.com/embed/" + data.media}
        ></iframe>
      )}
      <div>
        <span className="h5 bold ml-5">Image: </span>
        <input
          className="inputFilechoose"
          type="file"
          name="img"
          accept="image/*"
          onChange={(e) => uploadFile(e, setImg)}
        ></input>
        <button className="buttonS pl1 pr1 bold" onClick={(e) => uploadFile(e)}>
          Upload
        </button>

        <input
          type="text"
          className="input"
          placeholder="Image URL"
          value={data.img}
          onChange={(e) => setImg(e.target.value)}
        />
        {data.img && <img className="ml1 img" src={data.img} alt="No_Image" />}
      </div>

      <div>
        <span className="h5 bold ml-5">Version: </span>
        <input
          className="inputN"
          type="number"
          step="0.01"
          value={data.version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>
      {/* <textarea
        className="textarea"
        rows="7"
        placeholder="Add Description"
        value={data.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea> */}
      {/* <TextEditor editor={data.description} setEditor={setDescription} />
      <TEditor editor={data.description} setEditor={setDescription} />
      <MyText editor={data.description} setEditor={setDescription} /> */}
      <SunText editor={data.description} setEditor={setDescription} />
      <div className="ml-5 mu1">
        <span className="h5 bold mr1">Available on: </span>
        <div className="flex ml1 mu-25">
          <input
            type="checkbox"
            checked={data.available.MT4}
            onChange={(e) => setMT4(e.checked)}
          />
          <span className="span1 mr-5">MT4</span>

          <input
            type="checkbox"
            checked={data.available.MT5}
            onChange={(e) => setMT5(e.checked)}
          />
          <span className="span1 mr-5">MT5</span>

          <input
            type="checkbox"
            checked={data.available.TV}
            onChange={(e) => setTV(e.checked)}
          />
          <span className="span1 mr-5">TradingView</span>
        </div>
      </div>
      {post.err && <p className="bold pDang mu1 ml-5">{post.err}</p>}
      {post.done && <p className="bold pDone mu1 ml-5">Product added</p>}
      <div className="ml-5 mu1">
        <button className="buttonS mr-5 pl2 pr2">Save</button>
        <button className="buttonP pl2 pr2" onClick={() => postP()}>
          Post
        </button>
      </div>
    </>
  );
}

export default CreateProduct;
