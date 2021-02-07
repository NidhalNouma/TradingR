import React from "react";
import StarsIcon from "@material-ui/icons/Stars";
import { prices } from "./pricing/price";

function Badge({ val, pr }) {
  const color =
    val === 1 || pr === prices.p1.id.m || pr === prices.p1.id.y
      ? "var(--scolor)"
      : val === 2 || pr === prices.p2.id.m || pr === prices.p2.id.y
      ? "var(--tcolor)"
      : val === 3 || pr === prices.p3.id.m || pr === prices.p3.id.y
      ? "var(--pcolor)"
      : null;

  return (
    <>
      {color && (
        <div className="svgb flex">
          <StarsIcon style={{ color: color }} />
        </div>
      )}
    </>
  );
}

export default Badge;
