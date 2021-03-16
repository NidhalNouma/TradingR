import React, { useContext } from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import Menup from "../menu";
import Profile from "./Profile";
import { UserC } from "../../Hooks/User";

function Setting() {
  const { user, setUser } = useContext(UserC);

  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={4} />
        </div>
        <div className="right">
          <Profile user={user} setUser={setUser} />

          <p
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "0",
            }}
          >
            <button
              className="buttonT"
              style={{ color: "rgb(170, 160, 32)" }}
              onClick={() => {
                setUser(null);
                document.cookie =
                  "_SSDI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              }}
            >
              Log Out
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Setting;
