import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Logoi from "../../asset/images/logo";
import Facei from "../../asset/images/face";
import Menui from "../../asset/images/menu";
import Bell from "../../asset/images/Bell";
import Search from "../../asset/images/search";
import Card from "./card/card";
import Face from "./face/face";
import Menu from "./menu/menu";
import Show from "../show";

import { UserC } from "../Hooks/User";

export default function Nav(props) {
  const rel = {
    position: "relative",
  };
  const fix = {
    position: "fixed",
  };

  const user = useContext(UserC);

  const history = useHistory();
  const notif = null; // useSelector((state) => state.notif);

  const [search, setSearch] = useState(props.search);
  const [showCard, setShowCard] = useState(false);
  const [showFace, setShowFace] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sign = Show();

  return (
    <>
      <nav style={props.here ? fix : rel}>
        <div className="logo ml3 mu-5">
          <Link to="/">
            <Logoi />
          </Link>
        </div>
        <div className="menu mr3 mu-5">
          <ul>
            {/* <li>
              <div className="search">
                <Search />
                <input
                  id="searchT"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      history.push("/search/" + search);
                    }
                  }}
                />
              </div>
            </li> */}
            <li>
              <Link
                to="/pricing"
                className="aNav btnHover"
                style={
                  props.loc === "PRICING"
                    ? {
                        backgroundColor: "var(--tcolor)",
                      }
                    : {}
                }
              >
                {" "}
                Pricing{" "}
              </Link>
            </li>
            {/* <li>
              <Link
                to="/posts"
                className="aNav btnHover"
                style={
                  props.loc === "POSTS"
                    ? {
                        backgroundColor: "var(--tcolor)",
                      }
                    : {}
                }
              >
                {" "}
                Posts{" "}
              </Link>
            </li> */}
            <li>
              <Link
                to="/strategys"
                className="aNav btnHover"
                style={
                  props.loc === "ROBOT"
                    ? {
                        backgroundColor: "var(--tcolor)",
                      }
                    : {}
                }
              >
                Strategys
              </Link>
            </li>
            <li>
              <Link
                to="/indicators"
                className="aNav btnHover"
                style={
                  props.loc === "INDICATOR"
                    ? {
                        backgroundColor: "var(--tcolor)",
                      }
                    : {}
                }
              >
                Indicators
              </Link>
            </li>
            <li>
              {user.user ? (
                <button
                  className="abtn flexA btnHover svg2"
                  onClick={() => setShowFace(true)}
                >
                  <Facei />
                </button>
              ) : (
                <button
                  className="signin abtnNav btnHover"
                  onClick={() => user.check(true)}
                >
                  SignIn
                </button>
              )}
            </li>
            {user.user && (
              <li>
                <button
                  className="abtn flexA btnHover svg2"
                  onClick={() => setShowCard(true)}
                >
                  <Bell exist={notif && notif.length > 0 ? true : false} />
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* <div className="search">
          <Search />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                history.push("/search/" + search);
              }
            }}
          />
        </div> */}

        <div className="media mr1">
          <button
            className="abtn flexA btnHover svg2 mr1"
            onClick={() => setShowMenu(true)}
          >
            <Menui click={showMenu} />
          </button>
        </div>
      </nav>

      {showCard ? (
        <Card close={() => setShowCard(false)} notif={notif} />
      ) : (
        <></>
      )}
      {showFace ? <Face close={() => setShowFace(false)} /> : <></>}
      {showMenu ? (
        <Menu
          close={() => setShowMenu(false)}
          sign={sign.sshow}
          user={user.user}
        />
      ) : (
        <></>
      )}
    </>
  );
}
