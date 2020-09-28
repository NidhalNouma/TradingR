import React, { useState } from "react";
import AcctiveAccount from "./AcctiveAccount";
import CreateAccount from "./CreateAccount";

function Index(props) {
  const [activ, setActiv] = useState(false);
  return (
    <>
      {activ ? (
        <AcctiveAccount activ={activ} setActiv={setActiv} {...props} />
      ) : (
        <CreateAccount setActiv={setActiv} {...props} />
      )}
    </>
  );
}

export default Index;
