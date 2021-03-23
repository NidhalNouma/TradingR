import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { UserC } from "../../Hooks/User";
import { uploadImg64 } from "../../Hooks/Firebase";

function Form({ i }) {
  const { user } = useContext(UserC);
  const {
    email,
    setEmail,
    sub,
    setSub,
    msg,
    setMsg,
    err,
    click,
    done,
    files,
    setFiles,
    submit,
  } = Submit(user, i);
  const ref = useRef(null);

  useEffect(() => {
    if (i !== "Other") setSub(i);
    else setSub("");
  }, [i]);

  return (
    <div className="form">
      {user ? (
        <input className="input" value={user.email} />
      ) : (
        <input
          className="input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {i === "Other" && (
        <input
          className="input mu1"
          type="text"
          placeholder="Subject"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
        />
      )}
      <textarea
        className="input mu1"
        placeholder="Message"
        rows="10"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      {err && (
        <span
          style={{
            display: "block",
            color: "red",
            margin: "2px 0",
            fontSize: "0.8rem",
          }}
        >
          {err}
        </span>
      )}
      {done && (
        <div className="mu1 md1">
          <Alert severity="success">
            Thanks for contacting us, we receive your message and will contact
            you as soon as we can.
          </Alert>
        </div>
      )}
      <div className="flexB mu1">
        <button className="buttonS" onClick={() => ref.current.click()}>
          Choose Files
        </button>
        <button
          className={"buttonP pl2 pr2 " + (click ? "aclick " : "")}
          onClick={submit}
        >
          {click ? "Submit ..." : "Submit"}
        </button>
      </div>
      <input
        className="hidden"
        type="file"
        multiple={true}
        ref={ref}
        onChange={(e) => {
          const f = e.target.files;
          console.log(f);
          let arr = files;
          for (const i in f) {
            const fi = f[i];
            if (fi.size > 0) {
              const reader = new FileReader();
              reader.readAsDataURL(fi);
              reader.onloadend = (e) => {
                arr.push({ data: reader.result, name: fi.name });
                setFiles([...arr]);
              };
            }
          }
        }}
      />
      {/* <p className="pg1">{msg}</p> */}
      {files.length > 0 &&
        files.map((file, ii) => (
          <Li key={ii} del={(e) => setFiles(files.filter((i, k) => k !== ii))}>
            {file.name}
          </Li>
        ))}
    </div>
  );
}

export default Form;

const Li = ({ children, del }) => {
  return (
    <div style={styles.Li} className="flexB">
      <span className="span ml1">{children}</span>
      <button className="buttonC op-6 opHover" onClick={del}>
        X
      </button>
    </div>
  );
};

const styles = {
  Li: {
    backgroundColor: "var(--scolor)",
    margin: "1rem 0",
    padding: "0.5rem",
    borderRadius: "6px",
  },
};

const Submit = (user, s) => {
  const [email, setEmail] = useState(user && user.email ? user.email : "");
  const [sub, setSub] = useState(s === "Other" ? "" : s);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [click, setClick] = useState(false);
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState([]);

  const submit = async () => {
    setDone(false);
    if (!sub) {
      setErr("Subject is required");
      return;
    }
    if (!email) {
      setErr("Email is required");
      return;
    }
    if (!msg) {
      setErr("Message is required");
      return;
    }
    setClick(true);
    setErr("");

    const fn = async (f) => {
      // submit axios
      const { data } = await axios.post("/api/user/contact-us", {
        email,
        sub,
        msg,
        files: f,
      });
      if (data.res && !data.res.err) {
        setDone(true);
        setMsg("");
        // setSub("");
        setFiles([]);
      } else setErr("Error with sending Email please try again");
      setClick(false);
    };

    if (files.length > 0) {
      let ff = [];
      files.forEach((f) => {
        uploadImg64(
          f.data,
          f.name,
          (url) => {
            ff.push({ data: url, name: f.name });
            if (ff.length === files.length) fn(ff);
          },
          "contact-us"
        );
      });
    } else fn([]);
  };

  return {
    email,
    setEmail,
    sub,
    setSub,
    msg,
    setMsg,
    err,
    click,
    done,
    files,
    setFiles,
    submit,
  };
};
