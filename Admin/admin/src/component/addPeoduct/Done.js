import React, { useState } from "react";
import Preview from "./Preview";

function Done({ post, postP, data }) {
  const [prev, setPrev] = useState(false);
  return (
    <>
      {post.err && <p className="bold pDang mu1 ml-5">{post.err}</p>}
      {post.done && <p className="bold pDone mu1 ml-5">Product added</p>}
      <div className="ml-5 mu1">
        <button className="buttonS mr-5 pl2 pr2" onClick={() => setPrev(true)}>
          Preview
        </button>
        <button className="buttonS mr-5 pl2 pr2">Save</button>
        <button className="buttonP pl2 pr2" onClick={() => postP(data)}>
          Post
        </button>
      </div>
      {prev && (
        <Preview
          data={data}
          close={() => {
            setPrev(false);
          }}
        />
      )}
    </>
  );
}

export default Done;
