import React from "react";
import {authService} from "../fbase";
import {useHistory} from "react-router-dom";
import "../styles/Profile.css"

const Profile = ({userObj}) => {
  const history = useHistory();

  async function onLogOutClick() {
    await authService.signOut();
    history.push("/");
  }

  return (
    <div className="body">
      <div className="blackBox">
        <div className="profileContent">
          <h1>Profile</h1>
          <table className="profileTable">
            <thead></thead>
            <tbody>
            <tr>
              <td><strong>닉네임</strong></td>
              <td className="profileData">{userObj.nickname}</td>
            </tr>
            <tr>
              <td><strong>포인트</strong></td>
              <td className="profileData">{userObj.point}</td>
            </tr>
            <tr>
              <td><strong>레벨</strong></td>
              <td className="profileData">{userObj.level}</td>
            </tr>
            </tbody>
          </table>
          <button className="btnLogOut" onClick={onLogOutClick}>LOG OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
