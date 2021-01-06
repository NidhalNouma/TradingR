import React, { useState } from "react";

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

import FroalaEditor from "react-froala-wysiwyg";

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

function FroalaE() {
  const [model, setModel] = useState("");

  const handleModelChange = (model) => {
    setModel(model);
  };
  var config = {
    // define hight
    // heightMin: 420,
    height: 420,
    placeholderText: "Edit Your Content Hereee!",
    // fontFamily: {
    //   "Roboto,sans-serif": "Roboto",
    //   "Oswald,sans-serif": "Oswald",
    //   "Montserrat,sans-serif": "Montserrat",
    //   "'Open Sans Condensed',sans-serif": "Open Sans Condensed",
    // },
    toolbarButtons: {
      moreText: {
        buttons: [
          "fontFamily",
          "fontSize",
          "paragraphFormat",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
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
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",

          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
          "insertFile",
          "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "insertHTML",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
          "clear",
          "alert",
          "help",
        ],
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
  };

  return (
    <div>
      {/* <FroalaEditor tag="textarea" /> */}

      <FroalaEditor
        model={model}
        onModelChange={handleModelChange}
        config={config}
      />
    </div>
  );
}

export default FroalaE;
