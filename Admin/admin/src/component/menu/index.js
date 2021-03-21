import { Link } from "react-router-dom";
function Menu({ ty }) {
  const sty = { color: "var(--tcolor)" };
  const url = process.env.REACT_APP_URL;
  return (
    <nav>
      <ul>
        <li>
          <Link
            style={ty === 0 ? sty : {}}
            className="buttonT tHover"
            to={url + "/"}
          >
            Dashboard
          </Link>
        </li>
        {/* <li>
          <Link
            style={ty === 1 ? sty : {}}
            className="buttonT tHover"
            to="/posts"
          >
            Posts
          </Link>
        </li> */}
        <li>
          <Link
            style={ty === 2 ? sty : {}}
            className="buttonT tHover"
            to={url + "/robots"}
          >
            Robots
          </Link>
        </li>
        <li>
          <Link
            style={ty === 3 ? sty : {}}
            className="buttonT tHover"
            to={url + "/indicators"}
          >
            Indicators
          </Link>
        </li>
        <li>
          <Link
            style={ty === 4 ? sty : {}}
            className="buttonT tHover"
            to={url + "/users"}
          >
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
