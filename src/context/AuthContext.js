import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { emailToName } from '../components/Functions';
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const redirect = useNavigate();
  const [user, setUser] = useState(null);
  const [extraCheck, setExtraCheck] = useState(true);

  const registerNewUser = (email, password) => {
    if (user) {
      alert(emailToName(user.email) + " is still logged in. Please log out first");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
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
      alert(emailToName(user.email) + " is still logged in. Please log out first");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
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
    if (window.confirm("Are you SURE you want to permanently delete your account?")) {
      if (window.confirm("Are you positive you really really want to PERMANENTLY delete your account?")){
        deleteUser(user).then(() => {
          getThenDeleteFavourites();
          getThenDeleteCharacters();
          alert("Account permanently deleted.")
          redirect("/");
          }).catch((error) => {
            alert(error);
          });
      }
    }
  }

  async function getThenDeleteFavourites () {
    const favourites = await getDocs(collection(db, "Favourites_user" + user.uid));
    favourites.forEach((doc) => {
      deleteSingleDoc(doc, "Favourites_user");
    });
  }

  async function getThenDeleteCharacters () {
    const favourites = await getDocs(collection(db, "Characters_user" + user.uid));
    favourites.forEach((doc) => {
      deleteSingleDoc(doc, "Characters_user");
    });
  }

  async function deleteSingleDoc(setDoc, location) {
    await deleteDoc(doc(db, location + user.uid, setDoc.id));
  }

  const checkForUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setExtraCheck(false);
      } else {
        setUser(null);
        setExtraCheck(false);
      }
    });
  };

  useEffect(() => {
    checkForUser();
  }, []);


  return (
      <AuthContext.Provider value ={{ user, setUser, registerNewUser, login, logout, permDelete, extraCheck }}>
        {props.children}
      </AuthContext.Provider>
  )
}


