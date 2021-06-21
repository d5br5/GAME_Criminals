import React, { useState } from "react";
import { authService, dbService } from "../fbase";
import Button from "@material-ui/core/Button";

function AuthForm({ authMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const point = 50;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (authMode === "signUp") {
        await authService
          .createUserWithEmailAndPassword(email, password)
          .then(async (res) => {
            const currUser = authService.currentUser;
            await currUser.updateProfile({
              displayName: nickname,
            });
          })
          .then(async () => {
            const currUser = await authService.currentUser;
            return currUser
          })
          .then(async (currUser)=>{
            await dbService.collection("users").doc(currUser.uid).set({
              id: currUser.uid,
              nickname,
              point,
            });
          })
          .then(() => {
            window.location.reload();
          });
      } else if (authMode === "signIn") {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div style={{ width: 400, display: "inline-block" }}>
      <form onSubmit={onSubmit} className="authForm">
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
        {authMode === "signUp" && (
          <input
            type="text"
            name="nickname"
            required
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          style={{ height: "40px" }}
          type="submit"
        >
          {authMode === "signUp" ? "Create Account" : "Sign In"}
        </Button>
      </form>
      {error && <span className="loginError">{error}</span>}
    </div>
  );
}

export default AuthForm;
