import { useState } from "react";
import { uploadFile, uploadFiles } from "../../Hooks/FireBase";
import { PostProduct } from "../../Hooks/Product";
import Done from "./Done";
import SunText from "./textEditor/SunText";
import SunTextMin from "./textEditor/SunTextMin";

function CreateProduct({ ty }) {
  const {
    post,
    postP,

    setTitle,
    setDescription,
    setVersion,
    setMT4,
    setMT5,
    setTV,
    setImg,
    setMedia,
    setResults,
    setInputs,
    setHowtouse,
    setWhatsnew,

    version,
    title,
    img,
    media,
    desc,
    results,
    inputs,
    howtouse,
    whatsNew,
    MT4,
    MT5,
    TV,
  } = PostProduct(ty);

  const [imURL, setIM] = useState(false);

  return (
    <>
      <h4 className="h4 md2">Create new product </h4>
      <input
        type="text"
        className="inputT"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="Youtube Viideo Embed"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
      />
      <div>
        <span className="h5 bold ml-5">Cover image: </span>
        <input
          className="inputFilechoose"
          type="file"
          name="img"
          accept="image/*"
          onChange={(e) => uploadFile(e, setImg)}
        ></input>
        <span
          className="buttonT"
          style={{ color: imURL ? "var(--cancelcolor)" : "" }}
          onClick={() => setIM(!imURL)}
        >
          {imURL ? "Cancel" : "Add Img URL"}
        </span>
        {imURL && (
          <input
            type="text"
            className="input"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        )}
        {img && <img className="ml1 img" src={img} alt="No_Image" />}
      </div>

      <div>
        <span className="h5 bold ml-5">Version: </span>
        <input
          className="inputN"
          type="number"
          step="0.01"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>
      <div>
        <span className="h5 bold ml-5">Description: </span>
        <SunText editor={desc} setEditor={setDescription} />
      </div>

      <div className="ml-5 mu1">
        <span className="h5 bold mr1">Results: </span>
        <input
          className="inputFilechoose"
          type="file"
          name="img"
          accept="image/*"
          multiple
          onChange={(e) => uploadFiles(e, setResults)}
        ></input>
      </div>
      <div className="ml-5 mu1">
        <span className="h5 bold mr1">Inputs: </span>
        <SunTextMin
          placeholder="Inputs ..."
          editor={inputs}
          setEditor={setInputs}
        />
      </div>
      <div className="ml-5 mu1">
        <span className="h5 bold mr1">How to use: </span>
        <SunTextMin
          placeholder="How to use ..."
          editor={howtouse}
          setEditor={setHowtouse}
        />
      </div>
      <div className="ml-5 mu1">
        <span className="h5 bold mr1">What's new: </span>
        <SunTextMin
          placeholder="What's new ..."
          editor={whatsNew}
          setEditor={setWhatsnew}
        />
      </div>

      <div className="ml-5 mu1">
        <span className="h5 bold mr1">Available on: </span>
        <div className="flex ml1 mu-25">
          <input
            type="checkbox"
            checked={MT4}
            onChange={(e) => setMT4(e.target.checked)}
          />
          <span className="span1 mr-5">MT4</span>

          <input
            type="checkbox"
            checked={MT5}
            onChange={(e) => setMT5(e.target.checked)}
          />
          <span className="span1 mr-5">MT5</span>

          <input
            type="checkbox"
            checked={TV}
            onChange={(e) => setTV(e.target.checked)}
          />
          <span className="span1 mr-5">TradingView</span>
        </div>
      </div>
      <Done
        data={{
          type: ty,
          version: version,
          title: title,
          description: desc,
          img: img,
          media: media,
          available: {
            MT4: MT4,
            MT5: MT5,
            tradingView: TV,
          },
          moreDes: {
            results: results,
            inputs: inputs,
            howtouse: howtouse,
            whatsNew: whatsNew,
          },
        }}
        post={post}
        postP={postP}
      />
    </>
  );
}

export default CreateProduct;
