import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";

import Show from "../../show";
import Signin from "../../signIn";
import Trynow from "./Trynow";

import Thumpsup from "../../../asset/images/thumpUp";
import Share from "../../../asset/images/Share";
import Bookmark from "../../../asset/images/bookmark";

function MyApp({ price, sch, product, version, sel, setSel }) {
  const [int, setInt] = useState({
    Thumpsup: false,
    Star: false,
    Bookmark: false,
  });
  const sign = Show();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [trynow, setTrynow] = React.useState(false);
  const card = useSelector((state) => {
    if (state.user === null) return null;
    const user = state.user;
    return user.card;
  });

  return (
    <>
      <div className="cost">
        <form action="/api/done/payment" method="POST" id="payment">
          <a
            onClick={() => {
              setTrynow(true);
            }}
            className="buy-btn"
          >
            Try Now
          </a>
          <a>Subscribe</a>
          <span>83 Subscriber</span>
          <span>43 Downloads</span>
          <div>
            <div>
              <Thumpsup
                fill={int.Thumpsup}
                onClick={() => setInt({ ...int, Thumpsup: !int.Thumpsup })}
              />
              <span className="span">33</span>
            </div>
            <div>
              <Bookmark
                fill={int.Bookmark}
                onClick={() => setInt({ ...int, Bookmark: !int.Bookmark })}
              />
            </div>
            <div>
              <Share
                fill={int.Star}
                onClick={() => setInt({ ...int, Star: !int.Star })}
              />
            </div>
          </div>
          <div>
            <span>
              <div>Version</div>
              <select onChange={(e) => setSel(e.target.value)}>
                {version &&
                  version
                    .sort((a, b) => b - a)
                    .map((i) => (
                      <option key={i} value={i}>
                        {i.toFixed(1)}
                      </option>
                    ))}
              </select>
            </span>
          </div>
        </form>
      </div>
      {sign.show ? <Signin close={sign.cshow} show={sign.show} /> : <></>}
      {trynow ? <Trynow trynow={trynow} setTrynow={setTrynow} /> : <></>}
    </>
  );
}

export default function Buy({ price, sch, product, version, sel, setSel }) {
  return (
    <SnackbarProvider maxSnack={4}>
      <MyApp
        price={price}
        sch={sch}
        product={product}
        version={version}
        sel={sel}
        setSel={setSel}
      />
    </SnackbarProvider>
  );
}
