import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

function Post({ content, title }) {
  return (
    <div>
      <div className="post-content md3">
        <h3 className="h3 md3">{title}</h3>
        <FroalaEditorView model={content} />
      </div>
    </div>
  );
}

export default Post;
