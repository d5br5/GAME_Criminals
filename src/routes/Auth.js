import React, {useState} from "react";
import authService, {dbService, firebaseInstance} from "../fbase";
import AuthForm from "../components/AuthForm";

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
    <div>
      <button onClick={() => {
        setAuthMode('SignIn');
        setProcessing(true)
      }}>Sign In
      </button>
      <button onClick={() => {
        setAuthMode('SignUp');
        setProcessing(true)
      }}>Sign Up
      </button>
      {
        processing && <AuthForm authMode={authMode}/>
      }
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
      </div>
    </div>
  );
};

export default Auth;