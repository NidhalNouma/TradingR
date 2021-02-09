import React, { useEffect, useRef, useState } from "react";
import UserImg from "../../../asset/images/UserImg";
import ActiveAccount from "../../createAccount/AcctiveAccount";
import Sub from "./Sub";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraSharpIcon from "@material-ui/icons/PhotoCameraSharp";

function Profile({ user, setUser }) {
  const profImg = useRef(null);
  const [activ, setActiv] = useState(false);

  useEffect(() => {
    console.log("user => ", user);
  }, [user]);

  return (
    <>
      <div className="profile" style={{ justifyContent: "center" }}>
        <div className="photo">
          {user.userPicture !== "noimg" ? (
            <img src={user.userPicture} alt="ProfileImg" />
          ) : (
            <UserImg />
          )}
          <IconButton
            edge="start"
            color="var(--pcolor)"
            onClick={(e) => profImg.current.click()}
          >
            <PhotoCameraSharpIcon />
          </IconButton>
          <input
            ref={profImg}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => setUser({ ...user, userPicture: e.target.value })}
          />
        </div>
      </div>
      <div className="setting">
        <TextField
          label="First Name"
          defaultValue={user.userName}
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          label="Last Name"
          defaultValue={user.userName}
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          label="User Name"
          defaultValue={user.userName}
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          label="Email"
          defaultValue={user.email}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          variant="outlined"
          fullWidth={true}
          disabled={true}
        />
        {!user.active && (
          <p className="pv bold">
            Your Email is not verified. Click
            <button className="buttonT tHover" onClick={(e) => setActiv(true)}>
              here
            </button>
            to verify your email.
          </p>
        )}
        <button className="buttonP md3" style={{ width: "100%" }}>
          Save
        </button>

        <Sub sub={user.sub} />
      </div>

      <ActiveAccount activ={activ} setActiv={setActiv} />
    </>
  );
}

export default Profile;
