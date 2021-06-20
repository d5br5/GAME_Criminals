import React, {useState} from "react";
import authService, {dbService, firebaseInstance} from "../fbase";
import AuthForm from "../components/AuthForm";
import "./Auth.css";

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
    <div className="sign">
      <button className="btnSignIn" onClick={() => {
        setAuthMode('SignIn');
        setProcessing(true)
      }}>Sign In
      </button>
      <button className="btnSignUp" onClick={() => {
        setAuthMode('SignUp');
        setProcessing(true)
      }}>Sign Up
      </button>
      {
        processing && <AuthForm authMode={authMode}/>
      }
      <div>
        <button className="btnGoogle" onClick={onSocialClick} name="google">Continue with Google</button>
      </div>
    </div>
  );
};

export default Auth;