import React from "react";
import moment from "moment";
import { prices } from "../../pricing/price";

function Sub({ sub }) {
  const d = getSub(sub);
  console.log(d);

  return (
    <div>
      <h5 className="h5">Subscription:</h5>
      {d.length > 0 && d.map((i) => <Item i={i} />)}
    </div>
  );
}

export default Sub;

function Item({ i }) {
  return (
    <>
      <p>
        {i.title} {i.end}
      </p>
    </>
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
          r.push({ title: data.title, end });
        } else if (i.price === data.id.y) {
          const end = moment(i.end * 1000).format("MMMM Do YYYY");
          r.push({ title: data.title, end });
        }
      });
    }
  }

  return r;
}
