import React, { useState } from "react";
import { authService, dbService } from "../fbase";

function AuthForm({ authMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");

  const point = 50;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (authMode === "SignUp") {
        await authService
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            const currUser = authService.currentUser;
            currUser.updateProfile({
              displayName: nickName,
            });
            dbService.collection("users").doc(currUser.uid).set({
              id: currUser.uid,
              nickName,
              point,
            });
          });
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
          name="nickName"
          required
          placeholder="nickName"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
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
