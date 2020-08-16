import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Button, Input } from "@material-ui/core";
import { auth } from "../../database/firebase";
import CustomModal from "../UI/Modal/CustomModal";
function Navbar({ userChange }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        userChange(authUser);
        setUser(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user, username]);
  const handleSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setUser(authUser);
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .then((user) => {
        setSignUp(false);
        userChange(user);
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleSignIn = (e) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => userChange(authUser))
      .catch((error) => {
        alert(error.message);
      });
    setSignIn(false);
  };
  return (
    <div className="navbar__container">
      <img
        className="navbar__logo"
        src="https://cdn.worldvectorlogo.com/logos/instagram-1.svg"
        alt="instagram logo"
      ></img>
      {!user ? (
        <div className="navbar__buttonGroup">
          <Button onClick={() => setSignIn(true)}>Sign in</Button>
          <Button onClick={() => setSignUp(true)}> Sign up</Button>
        </div>
      ) : (
        <div className="navbar__logout">
          <Button
            onClick={() => {
              auth.signOut();
              userChange(null);
            }}
          >
            Sign out
          </Button>
        </div>
      )}

      <CustomModal open={signUp} handleClose={(e) => setSignUp(false)}>
        <form className="navbar__form">
          <h1>Sign up</h1>
          <Input
            className="navbar__input"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            className="navbar__input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            className="navbar__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button type="submit" onClick={(e) => handleSignUp(e)}>
            OK
          </Button>
        </form>
      </CustomModal>
      <CustomModal open={signIn} handleClose={(e) => setSignIn(false)}>
        <form className="navbar__form">
          <h1>Sign in</h1>
          <Input
            className="navbar__input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            className="navbar__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button type="submit" onClick={(e) => handleSignIn(e)}>
            OK
          </Button>
        </form>
      </CustomModal>
    </div>
  );
}

export default Navbar;
