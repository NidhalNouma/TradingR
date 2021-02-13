import React from "react";

function Img({ src, imgs, setImgs }) {
  return (
    <div style={styles.div}>
      <img className="imgD" src={src} alt="img" />
      <button
        style={styles.button}
        className="buttonT"
        onClick={(e) => setImgs(imgs.filter((i) => i !== src))}
      >
        X
      </button>
    </div>
  );
}

export default Img;

const styles = {
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "var(--tcolor)",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
  },
  div: { display: "inline", position: "relative" },
};
