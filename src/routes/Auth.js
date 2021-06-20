import React, {useState} from "react";
import authService, {dbService, firebaseInstance} from "../fbase";
import AuthForm from "../components/AuthForm";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";

import '../styles/Auth.css';

const Auth = () => {

  const [authMode, setAuthMode] = useState('signIn');
  const [processing, setProcessing] = useState(false);
  const point = 60;

  async function onSocialClick(e) {
    const {target: {name}} = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          dbService.collection("users").doc(res.user.uid).set({
            id: res.user.uid, nickname: res.user.displayName, point
          })
        }
      })

  }

  return (
    <>
      <AuthForm authMode={authMode}/>
      <div className="authSelector">
        {
          authMode === 'signIn' ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setAuthMode('signUp');
                setProcessing(true)
              }}>회원가입
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setAuthMode('signIn');
                setProcessing(true)
              }}>로그인으로 돌아가기
            </Button>
          )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={onSocialClick} name="google">Google 계정으로 로그인 &nbsp; <FontAwesomeIcon icon={faGoogle}/></Button>
      </div>
    </>
  );
};

export default Auth;