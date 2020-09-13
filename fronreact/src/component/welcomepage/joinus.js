import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signin from "../signIn";

export default function Component(props) {
  const [show, setShow] = useState(false);
  const closesign = () => {
    setShow(false);
  };
  return (
    <>
      <div className="join" data-aos="fade-up">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <Link onClick={() => setShow(true)}>{props.link}</Link>
      </div>
      {show ? <Signin close={closesign} show={show} /> : <></>}
    </>
  );
}
