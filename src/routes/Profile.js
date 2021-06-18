import React from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();

  async function onLogOutClick() {
    await authService.signOut();
    history.push("/");
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>username : {userObj.nickname}</p>
      <p>point: {userObj.point}</p>

      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
