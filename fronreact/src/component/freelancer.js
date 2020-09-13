import React from "react";

function Freelancer() {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "0.6rem",
        borderRadius: "10px",
        boxShadow: "0px 0px 3px var(--shcolor)",
      }}
    >
      <a
        href="https://www.freelancer.com/affiliates/email/25888196/"
        style={{
          fontSize: "1rem",
          display: "block",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          alt="img"
          src="https://cdn3.f-cdn.com/ppic/139371706/logo/25888196/profile_logo_25888196.jpg"
          style={{
            float: "left",
            marginRight: "20px",
            marginBottom: "10px",
            width: "80px",
            maxHeight: "80px",
            borderRadius: "50%",
          }}
        />
      </a>
      <div style={{ minHeight: "40px" }}>
        <a
          style={{
            color: "blue",
            fontSize: "1rem",
            display: "block",
            textDecoration: "underline",
            fontWeight: "bold",
            marginTop: "20px",
          }}
          href="https://www.freelancer.com/affiliates/email/25888196/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nidhal Nouma
        </a>
        <p
          style={{
            color: "black",
            fontSize: "1rem",
            margin: "0",
            marginBottom: "6px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          Programmer
        </p>
        <br />

        <p
          style={{
            color: "black",
            fontSize: "1rem",
            margin: "0",
          }}
        >
          <strong>P:</strong> 0021628768581
        </p>

        <p
          style={{
            color: "black",
            fontSize: "1rem",
            margin: "0",
          }}
        >
          <strong>E:</strong> nidhal.nouma.0@gmail.com
        </p>
      </div>
      <img
        alt="img"
        src="https://www.freelancer.com/static/css/images/landingpage/hireme-widget-builder/fl-bird-icon.png"
        style={{ clear: "left", float: "left", margin: "10px 0" }}
      />
      <a
        href="https://www.freelancer.com/affiliates/email/25888196/"
        style={{
          color: "blue",
          fontSize: "1rem",
          display: "block",
          textDecoration: "underline",
          margin: "10px 0 10px 10px",
          verticalAlign: "middle",
          height: "21px",
          float: "left",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Hire me on Freelancer.com
      </a>
      <img
        src="//t.flnwdgt.com/1px.gif?username=nidhalnouma&amp;en=externalHireme&amp;method=img&amp;label=hiremeEmailImpression&amp;ip=197.3.69.190&amp;type=emailSignature"
        alt=""
        style={{ float: "left" }}
      />
    </div>
  );
}

export default Freelancer;
