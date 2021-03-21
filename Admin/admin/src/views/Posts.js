import Menu from "../component/menu";
import { Link } from "react-router-dom";

function Posts() {
  const url = process.env.REACT_APP_URL;

  return (
    <>
      <Menu ty={1} />
      <div className="pContain">
        <Link to={url + "/posts/add"} className="a buttonP pl1 pr1">
          Create New Post
        </Link>
      </div>
    </>
  );
}

export default Posts;
