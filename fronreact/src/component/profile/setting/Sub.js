import React from "react";
import moment from "moment";
import { prices } from "../../pricing/price";
import Badge from "../../Badge";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { cancelSubscriptions } from "../../Hooks/Stripe";
import Dialogalert from "../../Dialogalert";

function Sub({ setUser, user }) {
  const d = getSub(user.sub);
  const set = () => {
    setUser({ ...user, sub: [], subscription: "" });
  };
  return (
    <div>
      <h5 className="h5">Subscription:</h5>
      {d.length > 0 && d.map((i, ii) => <Item i={i} set={set} key={ii} />)}
    </div>
  );
}

export default Sub;

function Item({ i, set }) {
  const [des, setDes] = React.useState(false);
  return (
    <>
      <div className="flexB mu-5 md1 borderB pl1 pr1 pu-5 pd-5">
        <div className="flex">
          <span className="span2 bold">{i.title}</span>
          <Badge pr={i.price} />
          <span className="span1 ml1 mr1"> expire in {i.end} </span>
        </div>
        <RemoveCircleIcon
          onClick={(e) => setDes(true)}
          style={{ fill: "var(--shcolor)", width: "16px", cursor: "pointer" }}
        />
      </div>

      <Dialogalert
        open={des}
        setOpen={() => setDes(!des)}
        agree={() => {
          cancelSubscriptions(i.subId);
          set();
          setDes(false);
        }}
        title="Cancel subscription"
        body="Are you sure you want to cancel the subscription. Notice All live product will disabel in the next day"
      />
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
