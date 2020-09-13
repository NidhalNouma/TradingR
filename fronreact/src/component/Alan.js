import React from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

function Alan() {
  React.useEffect(() => {
    alanBtn({
      key:
        "64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          alanBtn().playText("Please try that again...");
        } else if (command === "instructions") {
          alanBtn().playText("Please try that again...");
        } else if (command === "highlight") {
          alanBtn().playText("Please try that again...");
        } else if (command === "open") {
          alanBtn().playText("Please try that again...");
        }
      },
    });
  }, []);

  return <div></div>;
}

export default Alan;
