import React from "react";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";

import FroalaEditor from "react-froala-wysiwyg";

import { uploadFile } from "../../Hooks/Firebase";

// Require Font Awesome.
// import "font-awesome/css/font-awesome.css";

// Include special components if required.
// import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

function FroalaE({ model, setModel, title, setTitle }) {
  const handleModelChange = (model) => {
    setModel(model);
  };

  const [save, setSaving] = React.useState(false);

  const config = {
    // define hight
    heightMin: 420,
    // height: 420,
    placeholderText: "Edit here!",
    // imageUploadURL: "http://localhost:8080/api/post/upload_image",
    videoUpload: false,
    imageAddNewLine: true,
    imagePaste: false,
    toolbarButtons: {
      moreText: {
        buttons: [
          // "paragraphFormat",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          // "subscript",
          // "superscript",
          // "textColor",
          "backgroundColor",
          // "inlineClass",
          // "inlineStyle",
          "clearFormatting",
        ],
        align: "left",
        buttonsVisible: 3,
      },

      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",

          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
        align: "left",
        buttonsVisible: 2,
      },

      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertFile",
          "insertTable",
          "emoticons",
          "fontAwesome",
          // "specialCharacters",
          "embedly",
          "insertHR",
        ],
        align: "left",
        buttonsVisible: 4,
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "selectAll",
          // "insertHTML",
          // "print",
          "getPDF",
          // "spellChecker",
          // "html",
          "clear",
          "alert",
          "help",
        ],
        align: "right",
        buttonsVisible: 3,
      },
      pluginsEnabled: [
        "table",
        "spell",
        "quote",
        "save",
        "quickInsert",
        "paragraphFormat",
        "paragraphStyle",
        "help",
        "draggable",
        "align",
        "link",
        "lists",
        "file",
        "image",
        "emoticons",
        "url",
        "video",
        "embedly",
        "colors",
        "entities",
        "inlineClass",
        "inlineStyle",
        // 'codeBeautif '
        // 'spellChecker',
        "imageTUI",
      ],
    },

    events: {
      "image.inserted": function ($img, response) {
        // Do something here.
        // this is the editor instance.

        toDataURL($img[0].src).then((dataUrl) => {
          setSaving(true);
          console.log("RESULT:", dataUrl);
          uploadFile(dataUrl, (url) => {
            $img[0].src = url;
            setSaving(false);
          });
        });
      },
      "file.inserted": function ($file, response) {
        // Do something here.
        // this is the editor instance.
        let f = $file[0].href;
        f = f.replace("%3A//", "://");
        toDataURL(f).then((dataUrl) => {
          setSaving(true);
          console.log("RESULT:", dataUrl);
          uploadFile(
            dataUrl,
            (url) => {
              $file[0].href = url;
              setSaving(false);
            },
            $file[0].innerHTML
          );
        });
      },
    },
  };

  return (
    <div className="froala-div">
      <input
        className="inputT md1"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FroalaEditor
        model={model}
        onModelChange={handleModelChange}
        config={config}
      />
      {/* <FroalaEditorView model={model} /> */}
      {save && <span className="span">Saving ...</span>}

      {/* <div dangerouslySetInnerHTML={{ __html: model }}></div> */}
    </div>
  );
}

export default FroalaE;

const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
