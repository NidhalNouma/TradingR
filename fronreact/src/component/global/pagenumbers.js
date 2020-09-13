import React from "react";
import Left from "../../asset/images/pagesarrow/left";
import Right from "../../asset/images/pagesarrow/right";

export default function Pagenumber() {
  return (
    <div className="pages-numbers">
      <a href="/">
        <Right />
        <span>Previous</span>
      </a>
      <ul>
        <li>
          <a href="/" className="now">
            1
          </a>
        </li>
        <li>
          <a href="/">2</a>
        </li>
        <li>
          <a href="/">3</a>
        </li>
        <li>
          <a href="/">4</a>
        </li>
        <li>
          <a href="/">5</a>
        </li>
      </ul>
      <a href="/">
        <span>Next</span>
        <Left />
      </a>
    </div>
  );
}
