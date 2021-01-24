import NoImgUser from "./NoImgUser";

function ProfileList({ p }) {
  return (
    <div className="profile-list">
      {p.userPicture === "noimg" ? (
        <NoImgUser />
      ) : (
        <img src={p.userPicture} alt="Profile" />
      )}
      <h5 className="h5">{p.userName}</h5>
      <span className="h5">Score: {p.score}</span>
    </div>
  );
}

export default ProfileList;
