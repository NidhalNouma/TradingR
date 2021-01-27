import React, { useState } from "react";

function MyText() {
  const [value, setValue] = useState("");
  return (
    <div className="mu1">
      <div className="text-head">
        <button>Bold</button>
      </div>
      <div
        className="textarea-replace"
        contenteditable="true"
        onInput={(e) => {
          setValue(e.target.outerText);
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default MyText;
