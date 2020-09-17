import React from "react";

import Thumpsup from "../../../../asset/images/thumpUp";
import Share from "../../../../asset/images/Share";
import Bookmark from "../../../../asset/images/bookmark";

function Interaction() {
  const [int, setInt] = React.useState({
    Thumpsup: false,
    Star: false,
    Bookmark: false,
  });
  return (
    <div>
      <div>
        <Thumpsup
          fill={int.Thumpsup}
          onClick={() => setInt({ ...int, Thumpsup: !int.Thumpsup })}
        />
        <span className="span">{product.likes.length}</span>
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
  );
}

export default Interaction;
