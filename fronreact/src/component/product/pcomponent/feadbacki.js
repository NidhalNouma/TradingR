import React from "react";
import UpArrow from "../../../asset/images/UpArrow";
import DnArrow from "../../../asset/images/dnArrow";

export default function Feadbacki() {
  return (
    <>
      <div className="feadback">
        <div className="top">
          <div className="det">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYMUs9Tan7_6xnJWQ-294Jt7KRquB5VNFTus8E-lEZuZ5u_3lA&usqp=CAU"
              alt=""
            />
            <h3>Name</h3>
          </div>
          <div className="vote">
            <a href="/">
              <UpArrow />
            </a>
            <span>22</span>
            <a href="/">
              <DnArrow />
            </a>
            <span>2</span>
          </div>
        </div>
        <div className="txt">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
            impedit asperiores rerum voluptatibus odio. Distinctio quaerat alias
            adipisci fuga qui dolores cumque quod voluptatum fugit laudantium
            expedita molestias possimus illum saepe, maiores ad, ut beatae odio
            amet. Hic perspiciatis consequatur quo sapiente soluta commodi
            incidunt, dolorum molestias voluptas eaque exercitationem sed fuga a
            tenetur consectetur neque eligendi sequi unde? Esse expedita facilis
            voluptates at deserunt eligendi, dignissimos
          </p>
          <hr />
          <div className="ans">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
              impedit asperiores rerum voluptatibus odio. Distinctio quaerat
              alias adipisci fuga qui dolores cumque quod voluptatum fugit
              laudantium
            </p>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
