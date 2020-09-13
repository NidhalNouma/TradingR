import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector, useDispatch } from "react-redux";

import { AddtoCard } from "../../Actions";
import Show from "../show";
import Signin from "../signIn";
import Trynow from "./pcomponent/Trynow";

import { Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      action={
        <Button color="inherit" size="small" onClick={props.onClose}>
          UNDO
        </Button>
      }
    />
  );
}

export default function Productlist({ load, product, sch }) {
  const [am, setam] = React.useState(false);
  const [trynow, setTrynow] = React.useState(false);
  const sign = Show();

  return (
    <>
      <div className="product-list">
        <div className="left-card">
          {load ? (
            <Skeleton variant="rect" className="skelton-me" />
          ) : (
            <img src={product.img} alt="" />
          )}
        </div>
        <div className="right-card">
          {load ? (
            <Skeleton variant="text" />
          ) : (
            <Link to={"/product/" + product._id}>
              <h2>{product.title}</h2>
            </Link>
          )}

          <div className="media-left-card">
            {load ? (
              <Skeleton variant="rect" className="skelton-me" />
            ) : (
              <img src={product.img} alt="" />
            )}
          </div>

          {load ? (
            <Skeleton variant="text" width="20%" />
          ) : (
            <h4>${product.price}</h4>
          )}
          {load ? (
            <Skeleton variant="rect" height={230} />
          ) : (
            <p>{product.description}</p>
          )}

          {load ? (
            <Skeleton variant="text" />
          ) : (
            <div className="btn-card">
              <Link to={"/product/" + product._id}>Read More</Link>
              <a onClick={() => setTrynow(true)} className="buy-btn">
                Try Now
              </a>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={am}
                autoHideDuration={3000}
                onClose={() => setam(false)}
              >
                <Alert
                  onClose={() => setam(false)}
                  severity="success"
                  style={{
                    backgroundColor: "var(--scolor)",
                    color: "var(--pcolor)",
                    borderRadius: "7px",
                  }}
                >
                  This is a success message!
                </Alert>
              </Snackbar>
            </div>
          )}
        </div>
      </div>

      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {trynow ? <Trynow trynow={trynow} setTrynow={setTrynow} /> : <></>}
    </>
  );
}
