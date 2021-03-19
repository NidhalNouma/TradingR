import React, { useContext, useState } from "react";
import { UserC } from "../../Hooks/User";

function Form({ i }) {
  const { user } = useContext(UserC);
  const [msg, setMsg] = useState("");

  return (
    <div className="form">
      {user ? (
        <input className="input" value={user.email} />
      ) : (
        <input className="input" type="text" placeholder="Email" />
      )}

      {i === 3 && (
        <input className="input mu1" type="text" placeholder="Subject" />
      )}
      <textarea
        className="input mu1"
        placeholder="Message"
        rows="10"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <div className="flexB mu1">
        <button className="buttonS">Choose Files</button>
        <button className="buttonP pl2 pr2">Submit</button>
      </div>
      {/* <p className="pg1">{msg}</p> */}
    </div>
  );
}

export default Form;
