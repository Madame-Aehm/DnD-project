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

  const registerNewUser = (email, password) => {
    if (user) {
      alert(emailToName(user.email) + " is still logged in. Please log out first");
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
      alert(emailToName(user.email) + " is still logged in. Please log out first");
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

  async function deleteUserCollections() {
    await deleteDoc(doc(db, "Favourites_user" + user.uid));
    await deleteDoc(doc(db, "Characters_user" + user.uid));
  }

  async function getCollections () {
    const favourites = await getDocs(collection(db, "Favourites_user" + user.uid));
    favourites.forEach((doc) => {
      console.log(doc);
      const data = doc.data();
      data.id = doc.id;
    });
  }

  const permDelete = () => {
    if (window.confirm("Are you SURE you want to permanently delete your account?")) {
      if (window.confirm("Are you positive you really really want to PERMANENTLY delete your account?")){
        deleteUser(user).then(() => {
          deleteUserCollections();
          alert("Account permanently deleted.")
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


