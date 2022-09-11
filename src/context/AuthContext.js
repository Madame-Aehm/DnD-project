import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { emailToName } from '../components/Functions';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const redirect = useNavigate();
  const [user, setUser] = useState(null);

  const registerNewUser = (email, password) => {
    if (user) {
      alert(user.email + " is still logged in. Please log out first");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          setUser(user);
          alert("Welcome, " + emailToName(user.email));
          redirect("/login-success", {replace: true});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", error);
          alert(errorMessage);
        });
      }
  };

  const login = (email, password) => {
    if (user) {
      alert(user.email + " is still logged in. Please log out first");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          setUser(user);
          redirect("/login-success", {replace: true});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", error);
          alert(errorMessage);
        });
      }
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut(auth)
      .then(() => {
        setUser(null);
        redirect("/login-success");
      })
      .catch((error) => {
        console.log("error", error);
        alert(error);
      });
    }
  };

  const permDelete = () => {
    if (window.confirm("Are you SURE you want to perminently delete your account?")) {
      if (window.confirm("Are you positive you really really want to PERMINENTLY delete your account?")){
        deleteUser(user).then(() => {
          alert("Account perminently deleted.")
          redirect("/");
          }).catch((error) => {
            alert(error);
          });
      }
    }
  }

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
      <AuthContext.Provider value ={{ user, setUser, registerNewUser, login, logout, permDelete }}>
        {props.children}
      </AuthContext.Provider>
  )
}


