import React from "react";

function Show() {
  const [show, setShow] = React.useState(false);
  const cshow = () => setShow(false);
  const sshow = () => setShow(true);

  return { show, cshow, sshow };
}

export default Show;
