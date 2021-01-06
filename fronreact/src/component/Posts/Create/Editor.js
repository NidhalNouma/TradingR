import React, { useState } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";

function Editor() {
  const [value, setValue] = useState("");
  return (
    <div>
      <EditorJs data={value} tools={EDITOR_JS_TOOLS} />
    </div>
  );
}

export default Editor;
