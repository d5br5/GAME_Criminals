import React from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import "../styles/Profile.css"

const Profile = ({ userObj }) => {
  const history = useHistory();

  async function onLogOutClick() {
    await authService.signOut();
    history.push("/");
  }

  return (
    <div className="body">
      <div className="profileContent">
        <h1>Profile</h1>
        <table className="profileTable">
          <tr><td>닉네임 :</td><td className="profileData">{userObj.nickname}</td></tr>
          <tr><td>포인트 :</td><td className="profileData">{userObj.point}</td></tr>
          <tr><td>레벨 :</td><td className="profileData">{userObj.level}</td></tr>
        </table>
        <button className="btnLogOut" onClick={onLogOutClick}>LOG OUT</button>
      </div>
    </div>
  );
};

export default Profile;
