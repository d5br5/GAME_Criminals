import React from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import "./Profile.css"

const Profile = ({ userObj }) => {
  const history = useHistory();

  async function onLogOutClick() {
    await authService.signOut();
    history.push("/");
  }

  return (
    <div className="bodyProfile">
      <div className="profileContent">
        <h1>PROFILE</h1>
        <p>닉네임 : {userObj.nickname}</p>
        <p>포인트 : {userObj.point}</p>

        <button className="btnLogOut" onClick={onLogOutClick}>LOG OUT</button>
      </div>
    </div>
  );
};

export default Profile;
