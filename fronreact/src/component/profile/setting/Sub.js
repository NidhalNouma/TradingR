import React from "react";
import moment from "moment";
import { prices } from "../../pricing/price";
import Badge from "../../Badge";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { cancelSubscriptions } from "../../Hooks/Stripe";

function Sub({ sub }) {
  const d = getSub(sub);

  return (
    <div>
      <h5 className="h5">Subscription:</h5>
      {d.length > 0 && d.map((i, ii) => <Item i={i} key={ii} />)}
    </div>
  );
}

export default Sub;

function Item({ i }) {
  return (
    <div className="flexB mu-5 md1 borderB pl1 pr1 pu-5 pd-5">
      <div className="flex">
        <span className="span2 bold">{i.title}</span>
        <Badge pr={i.price} />
        <span className="span1 ml1 mr1"> expire in {i.end} </span>
      </div>
      <RemoveCircleIcon
        onClick={(e) => cancelSubscriptions(i.subId)}
        style={{ fill: "var(--shcolor)", width: "16px", cursor: "pointer" }}
      />
    </div>
  );
}

function getSub(sub) {
  const r = [];
  if (sub && sub.length > 0) {
    for (let i in prices) {
      const data = prices[i];
      sub.forEach((i) => {
        if (i.price === data.id.m) {
          const end = moment(i.end * 1000).format("MMMM Do YYYY");
          r.push({ title: data.title, end, price: i.price, subId: i.subId });
        } else if (i.price === data.id.y) {
          const end = moment(i.end * 1000).format("MMMM Do YYYY");
          r.push({ title: data.title, end, price: i.price, subId: i.subId });
        }
      });
    }
  }

  return r;
}
