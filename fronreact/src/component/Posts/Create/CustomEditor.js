import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CustomEditor() {
  const [value, setValue] = useState("");
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      //   ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["link", "image", "video"],

      ["clean"], // remove formatting button
    ],
  };

  var options = {
    placeholder: "Compose an epic...",
  };

  return (
    <ReactQuill
      theme="snow"
      options={options}
      modules={modules}
      value={value}
      onChange={setValue}
    />
  );
}
export default CustomEditor;
