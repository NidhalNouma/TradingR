import React, { useContext } from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import FroalaE from "./FroalaE";
import Save from "../../../asset/images/Save";
import Send from "../../../asset/images/Send";

import { UserC } from "../../Hooks/User";
import { NewPost } from "../../Hooks/Post";

function Create(props) {
  const { user } = useContext(UserC);

  const [model, setModel] = React.useState("");
  const [title, setTitle] = React.useState("");

  const post = async () => {
    const r = await NewPost(user._id, title, model);
    if (r) {
      setModel("");
      setTitle("");
    }
  };

  return (
    <div>
      <Navbar here={false} loc={props.type} />
      <div className="containerCreate mu3">
        <FroalaE
          model={model}
          setModel={setModel}
          title={title}
          setTitle={setTitle}
        />
        <div className="btns">
          <button className="buttonS pl1 pr1 flexA svg1 mr1">
            <span className="mr-5">Save</span>
            <Save />
          </button>
          <button className="buttonP pl1 pr1 flexA svg1" onClick={post}>
            <span className="mr-5">Post</span>
            <Send />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Create;
