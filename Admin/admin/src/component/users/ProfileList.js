import NoImgUser from "./NoImgUser";

function ProfileList({ p }) {
  return (
    <div className="profile-list">
      {p.userPicture === "noimg" ? (
        <NoImgUser />
      ) : (
        <img src={p.userPicture} alt="Profile" />
      )}
      <h5 className="h5">{p.username}</h5>
    </div>
  );
}

export default ProfileList;
