import React from "react";
import parse from "html-react-parser";

function Preview({ data, close }) {
  const [sel, setSel] = React.useState(0);
  const style = { background: "var(--scolor)" };

  React.useEffect(() => {
    document.getElementsByTagName("BODY")[0].classList.add("hscroll-body");
    return () => {
      document.getElementsByTagName("BODY")[0].classList.remove("hscroll-body");
    };
  }, []);
  return (
    <div className="preview1">
      <div className="preview">
        <div className="flexB top">
          <span className="span">version: {data && data.version}</span>
          <div>
            <span className="span mr-5">Available On:</span>
            {data && data.available.MT4 && (
              <span className="span1 mr-5">MT4</span>
            )}
            {data && data.available.MT5 && (
              <span className="span1 mr-5">MT5</span>
            )}
            {data && data.available.tradingView && (
              <span className="span1 mr-5">TV</span>
            )}
          </div>
          <button className="buttonT" onClick={close}>
            Close
          </button>
        </div>
        {data && (
          <div className="bod">
            <iframe
              className="iframe"
              title="Video Desc"
              src={"https://www.youtube.com/embed/" + data.media}
            ></iframe>
            <h4 className="h4 mu1 md1">{data.title}</h4>
            <p className="p md2">{parse(data.description)}</p>

            <div className="sdetails flexA">
              <span
                style={sel === 0 ? style : undefined}
                onClick={() => setSel(0)}
              >
                Results
              </span>
              <span
                style={sel === 1 ? style : undefined}
                onClick={() => setSel(1)}
              >
                Inputs
              </span>
              <span
                style={sel === 2 ? style : undefined}
                onClick={() => setSel(2)}
              >
                How to use
              </span>
              <span
                style={sel === 3 ? style : undefined}
                onClick={() => setSel(3)}
              >
                What's new
              </span>
            </div>

            <div id="de">
              <div className="chart">
                {sel === 0 ? (
                  data.moreDes.results.map((i) => <img src={i} alt="img" />)
                ) : sel === 1 ? (
                  <p>{parse(data.moreDes.inputs)}</p>
                ) : sel === 2 ? (
                  <p>{parse(data.moreDes.howtouse)}</p>
                ) : (
                  <p>{parse(data.moreDes.whatsNew)}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
