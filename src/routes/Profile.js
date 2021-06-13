import React, {useState} from "react";
import {authService} from "../fbase";
import {useHistory} from "react-router-dom";

const Profile = ({userObj}) =>{

    const history = useHistory();

    async function onLogOutClick() {
        await authService.signOut();
        history.push("/");
    }

    return <div>
        username : {userObj.displayName}
        <button onClick={onLogOutClick}>Log out</button>
    </div>
};

export default Profile;