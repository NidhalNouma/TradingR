import React, { useRef, useState } from "react";
import UserImg from "../../../asset/images/UserImg";
import Sub from "./Sub";
import Acc from "./Acc";
import { UpdateUser, sendActivEmail } from "../../Hooks/User";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraSharpIcon from "@material-ui/icons/PhotoCameraSharp";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

function Profile({ user: fuser, setUser: setFUser }) {
  const profImg = useRef(null);
  const [activ, setActiv] = useState(false);
  const { user, setUser, update, error, load } = UpdateUser(fuser, setFUser);

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
            onChange={(e) => {
              const f = e.target.files[0];
              if (f.size > 0) {
                const reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onloadend = (e) => {
                  setUser({ ...user, userPicture: reader.result });
                };
              }
            }}
          />
        </div>
      </div>
      <div className="setting">
        <TextField
          label="First Name"
          defaultValue={user.firstName}
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          variant="outlined"
          fullWidth={true}
        />
        <TextField
          label="Last Name"
          defaultValue={user.lastName}
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
        {!fuser.active && (
          <p className="pv bold">
            Your Email is not verified. Click
            <button
              className="buttonT tHover"
              onClick={(e) => {
                if (!activ) {
                  sendActivEmail(fuser.email, fuser._id);
                  setActiv(true);
                }
              }}
            >
              here
            </button>
            to verify your email.
          </p>
        )}
        {activ && (
          <Alert
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginBottom: ".5rem",
            }}
            severity="info"
          >
            <p className="m0">
              We sent to you a verification email, Please check your mail.
            </p>
            <p className="m0">
              Don't receive any email?
              <button
                className="buttonT tHover"
                onClick={(e) => sendActivEmail(fuser.email, fuser._id)}
              >
                Send again
              </button>
            </p>
          </Alert>
        )}
        {error && (
          <Alert
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginBottom: ".5rem",
            }}
            severity="error"
          >
            {error}
          </Alert>
        )}
        <button
          className={!load ? "buttonP md3" : "buttonP md3 aclick"}
          style={{ width: "100%" }}
          onClick={update}
        >
          {!load ? (
            "Save"
          ) : (
            <CircularProgress size={25} style={{ color: "var(--scolor)" }} />
          )}
        </button>
        <Acc />
        <Sub user={fuser} setUser={setFUser} />
      </div>
    </>
  );
}

export default Profile;
