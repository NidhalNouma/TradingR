import React from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import FroalaE from "./FroalaE";
import Save from "../../../asset/images/Save";
import Send from "../../../asset/images/Send";

function Create(props) {
  return (
    <div>
      <Navbar here={false} loc={props.type} />
      <div className="containerCreate">
        <FroalaE />
        <div className="btns">
          <button className="buttonS pl1 pr1 flexA svg1 mr1">
            <span className="mr-5">Save</span>
            <Save />
          </button>
          <button className="buttonP pl1 pr1 flexA svg1">
            <span class="mr-5">Send</span>
            <Send />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Create;
