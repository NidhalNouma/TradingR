import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Logoi from "../../asset/images/logo";
import Facei from "../../asset/images/face";
import Cardi from "../../asset/images/card";
import Menui from "../../asset/images/menu";
import Bell from "../../asset/images/Bell";
import Search from "../../asset/images/search";
import Card from "./card/card";
import Face from "./face/face";
import Menu from "./menu/menu";
import Show from "../show";

import Signin from "../signIn";

export default function Nav(props) {
  const rel = {
    position: "relative",
  };
  const fix = {
    position: "fixed",
  };

  const history = useHistory();
  const user = useSelector((state) => state.user);

  const [search, setSearch] = useState(props.search);
  const [showCard, setShowCard] = useState(false);
  const [showFace, setShowFace] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sign = Show();

  return (
    <>
      <nav style={props.here ? fix : rel}>
        <div className="logo">
          <Link to="/">
            <Logoi />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <div className="search">
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
              </div>
            </li>
            <li>
              <Link
                to="/strategys"
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
              <Link
                to="/source"
                style={
                  props.loc === "SOURCE"
                    ? {
                        backgroundColor: "var(--tcolor)",
                      }
                    : {}
                }
              >
                {" "}
                Source{" "}
              </Link>
            </li>
            <li>
              {user ? (
                <a className="withimg" onClick={() => setShowFace(true)}>
                  <Facei />
                </a>
              ) : (
                <a className="signin" onClick={sign.sshow}>
                  Sign In
                </a>
              )}
            </li>
            {user && (
              <li>
                <a className="withimg" onClick={() => setShowCard(true)}>
                  <Bell
                    exist={
                      user && user.card && user.card.length > 0 ? true : false
                    }
                  />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="search">
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
        </div>

        <div className="media">
          <a onClick={() => setShowMenu(true)}>
            <Menui />
          </a>
        </div>
      </nav>

      {showCard ? <Card close={() => setShowCard(false)} user={user} /> : <></>}
      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {showFace ? <Face close={() => setShowFace(false)} /> : <></>}
      {showMenu ? (
        <Menu close={() => setShowMenu(false)} sign={sign.sshow} user={user} />
      ) : (
        <></>
      )}
    </>
  );
}
