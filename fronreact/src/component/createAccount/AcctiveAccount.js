import React, { useContext } from "react";
import { UserC, sendActivEmail } from "../Hooks/User";

function AcctiveAccount() {
  const { user } = useContext(UserC);

  return (
    <div className="activeaccount p2 pd1 pu1">
      <h3 className="h31">Active your account</h3>
      <p className="p bold pu1">
        We have sent an email for activation please checkout your mail
      </p>
      <div className="flexB mu2">
        <div></div>
        {user && (
          <button
            className="buttonT tHover"
            onClick={(e) => sendActivEmail(user.email, user._id)}
          >
            Send again
          </button>
        )}
      </div>
    </div>
  );
}

export default AcctiveAccount;
