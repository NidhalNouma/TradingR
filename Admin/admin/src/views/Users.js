import Menu from "../component/menu";
import ProfileList from "../component/users/ProfileList";
import { GetAllUsers } from "../Hooks/Users";
import { Link } from "react-router-dom";

function Users() {
  const { users } = GetAllUsers();
  return (
    <>
      <Menu ty={4} />
      <div className="userContain">
        {users ? (
          users.map((i) => (
            <Link key={i._id} to={"/users/" + i._id} className="ac">
              <ProfileList key={i._id} p={i} />
            </Link>
          ))
        ) : (
          <h5>Loading ...</h5>
        )}
      </div>
    </>
  );
}

export default Users;
