import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import { Editor } from "draft-js";
// import "draft-js/dist/Draft.css";

const options = {
  placeholder: "Description ...",
  options: [
    "inline",
    // "blockType",
    // "fontSize",
    // "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    // "emoji",
    "image",
    // "remove",
    "history",
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough", "monospace"],
  },
  fontSize: {
    // options: [19],
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    default: 14,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  //   fontFamily: {
  //     default: "Avenir",
  //     options: [
  //       "Avenir",
  //       "Arial",
  //       "Georgia",
  //       "Impact",
  //       "Tahoma",
  //       "Times New Roman",
  //       "Verdana",
  //     ],
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  //   },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
    // unordered: { icon: unordered, className: undefined },
    // ordered: { icon: ordered, className: undefined },
    // indent: { icon: indent, className: undefined },
    // outdent: { icon: outdent, className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
    // left: { icon: left, className: undefined },
    // center: { icon: center, className: undefined },
    // right: { icon: right, className: undefined },
    // justify: { icon: justify, className: undefined },
  },
  colorPicker: {
    // icon: color,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link"],
    // link: { icon: link, className: undefined },
    // unlink: { icon: unlink, className: undefined },
    linkCallback: undefined,
  },
  embedded: {
    // icon: embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
  image: {
    // icon: image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
  //   remove: {
  //       icon: eraser,
  //     className: undefined,
  //     component: undefined,
  //   },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["undo", "redo"],
    // undo: { icon: undo, className: undefined },
    // redo: { icon: redo, className: undefined },
  },
};

function TextEditor({ editor, setEditor }) {
  return (
    <div className="borderB1">
      <Editor
        // editorState={editor}
        // onChange={setEditor}
        editorState={editor}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={setEditor}
        toolbar={options}
      />
    </div>
  );
}

export default TextEditor;
