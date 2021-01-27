import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

function TEditor({ editor, setEditor }) {
  const [value, setValue] = React.useState(editor);

  const toolbarOptions = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      //   [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      //   [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //   [{ font: [] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["link", "image", "video"],
      [{ align: [] }],

      //   ["clean"], // remove formatting button
    ],
  };

  return (
    <div className="borderB1 mu1">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={toolbarOptions}
        placeholder="Description ..."
      />
      {/* <ReactQuill
        theme="snow"
        value={editor}
        onChange={(e) => {
          setEditor(e);
          console.log(e);
        }}
      /> */}
    </div>
  );
}

export default TEditor;
