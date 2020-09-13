import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

import Navbar from "../global/navbar";
import Footer from "../global/footer";
import Desc from "../welcomepage/description";
import Join from "../welcomepage/joinus";

import Budget from "../../asset/images/wp/budget";
import Kpi from "../../asset/images/wp/kpi";
import Ai from "../../asset/images/wp/ai";
import Opencode from "../../asset/images/wp/opencode";

function Welcome() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 1800, offset: 200 });
  }, [pathname]);

  let title1 = "How you win?";
  let title2 = "Open source";
  let title3 = "Indicators";
  let title4 = "Strategys";
  let content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  localStorage.setItem("visit", "true");

  return (
    <>
      <Navbar here={true} />
      <div className="contentHome">
        <div className="div" data-aos="fade-up">
          <Desc class="contgrid" title={title1} content={content} />
          <div className="img-s" data-aos="fade-up-left">
            <Budget />
          </div>
        </div>
        <div className="div" data-aos="fade-up">
          <div className="img-r" data-aos="fade-up-right" data-aos-delay="100">
            <Ai />
          </div>
          <Desc
            class="contgridr"
            title={title4}
            content={content}
            to={"/strategys"}
            link={"Go To Strategys"}
          />
        </div>
        <div className="div" data-aos="fade-up">
          <Desc
            class="contgrid"
            title={title3}
            content={content}
            to={"/indicators"}
            link={"Go To Indicators"}
          />
          <div className="img-s" data-aos="fade-up-left">
            <Kpi />
          </div>
        </div>
        <div className="div" data-aos="fade-up">
          <div className="img-r" data-aos="fade-up-right">
            <Opencode />
          </div>
          <Desc
            class="contgridr"
            title={title2}
            content={content}
            to={"/source"}
            link={"Go To source"}
          />
        </div>
      </div>
      <Join title={"Join Us"} content={content} to={"/"} link={"Sign In"} />

      <Footer />
    </>
  );
}

export default Welcome;
