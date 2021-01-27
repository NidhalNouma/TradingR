import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { uploadImg64 } from "../../../Hooks/FireBase";

// import parse from "html-react-parser";

const tool = {
  height: "auto",
  minHeight: 300,
  width: "100%",
  font: ["Avenir", "Arial"],
  fontSize: [14, 16, 18],
  templates: [
    {
      name: "Template-1",
      html: "<p>HTML source1</p>",
    },
    {
      name: "Template-2",
      html: "<p>HTML source2</p>",
    },
  ],
  buttonList: [
    [
      // "undo",
      //  "redo",
      "font",
    ],
    ["bold", "underline", "italic", "strike"],
    [
      "fontColor",
      "hiliteColor",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "table",
    ],
    ["link", "image", "video", "fullScreen"],
  ],
};

function SunText({ editor, setEditor }) {
  return (
    <div className="mu1">
      <SunEditor
        setDefaultStyle={"font-family:Avenir;font-size:1rem;"}
        setOptions={tool}
        setContents={editor}
        onChange={setEditor}
        onImageUpload={(e, index, state, imageInfo) => {
          if (e)
            uploadImg64(e.src, index, (url) => {
              e.src = url;
            });
        }}
        placeholder="Description ..."
      />
    </div>
  );
}

export default SunText;
