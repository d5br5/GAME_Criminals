import React, { useState } from "react";
import { authService, dbService } from "../fbase";

function AuthForm({ authMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const point = 200;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (authMode === "SignUp") {
        await authService
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            const currUser = authService.currentUser;
            currUser.updateProfile({
              displayName: nickname,
            });
            dbService.collection("users").doc(currUser.uid).set({
              id: currUser.uid,
              nickname,
              point,
            });
          }).then(()=>{
            window.location.reload();
          })
      } else if (authMode === "SignIn") {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }

  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {authMode === "SignUp" && (
        <input
          type="text"
          name="nickname"
          required
          placeholder="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      )}

      <input
        type="submit"
        value={authMode === "SignUp" ? "Create Account" : "Sign In"}
      />
      {error && <span>{error}</span>}
    </form>
  );
}

export default AuthForm;
