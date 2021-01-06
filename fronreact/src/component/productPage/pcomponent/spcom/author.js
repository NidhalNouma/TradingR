import React from "react";

import ThumpUp from "../../../../asset/images/thumpUp";
import Message from "../../../../asset/images/message";

function Author(props) {
  return (
    <>
      <div className="au-in">
        <div className="auther">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuiLL6EXefM3MUIpdFEu7UKyui1Dcm9AwfyLnLfqam7kw8Jwdh&usqp=CAU"
            alt=""
          />
          <h4>Auther name</h4>
        </div>
        {props.right && (
          <div className="int">
            <ThumpUp />
            <span>22</span>
            <Message />
            <span>23</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Author;
