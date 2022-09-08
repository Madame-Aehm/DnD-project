import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const redirect = useNavigate();
  const [user, setUser] = useState(null);

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        setUser(user);
        redirect("/login-success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
        alert(errorMessage);
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        setUser(user);
        redirect("/login-success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
        alert(errorMessage);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log("error", error);
        alert(error);
      });
  };

  const checkForUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    checkForUser();
  }, []);


  return (
      <AuthContext.Provider value ={{ user, setUser, registerNewUser, login, logout }}>
        {props.children}
      </AuthContext.Provider>
  )
}


