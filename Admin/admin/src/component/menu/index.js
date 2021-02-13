import { Link } from "react-router-dom";
function Menu({ ty }) {
  const sty = { color: "var(--tcolor)" };
  return (
    <nav>
      <ul>
        <li>
          <Link style={ty === 0 ? sty : {}} className="buttonT tHover" to="/">
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
            to="/robots"
          >
            Robots
          </Link>
        </li>
        <li>
          <Link
            style={ty === 3 ? sty : {}}
            className="buttonT tHover"
            to="/indicators"
          >
            Indicators
          </Link>
        </li>
        <li>
          <Link
            style={ty === 4 ? sty : {}}
            className="buttonT tHover"
            to="/users"
          >
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
