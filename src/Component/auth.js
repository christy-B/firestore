import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import FirestoreDB from "./firestoreDB";

const SignIn = () => {
  const [success, setSuccess] = useState("");
  const provider = new GoogleAuthProvider();

  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setSuccess(user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      {success !== "" ? (
        <div className="main">
          <h1>Welcome {success}</h1>
          <FirestoreDB />
        </div>
      ) : (
        <form onSubmit={signIn}>
          <h2>Sign In</h2>
          <button type="submit">Sign in with Google</button>
        </form>
      )}
    </div>
  );
};

export default SignIn;