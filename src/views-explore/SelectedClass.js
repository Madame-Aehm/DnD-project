import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import DisplayClass from '../components/DisplayClass';
import DisplaySubclass from '../components/DisplaySubclass';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

function SelectedClass() {
  const { user } = useContext(AuthContext);
  const [favouritesArray, setFavouritesArray] = useState([]);
  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const {
    array: cycleArray,
    searchResult,
    category
  } = location.state;

  const {
    selected: selectedClass, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedClass);

  async function addFavourite() {
    if (alreadyFavourited) {
      alert(selectedClass.name + " is already in your favourites.")
    } else {
      try {
        const docRef = await addDoc(collection(db, "Favourites_user" + user.uid), {
          name: selectedClass.name,
          url: selectedClass.url,
          index: selectedClass.index,
          fav_category: category
        });
        console.log("Document written with ID: ", docRef.id);
        alert(selectedClass.name + " added to Favourites!")
        getLocalFavourites();
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error adding document: ", e);
      }
    }
  }

  async function getLocalFavourites () {
    const fav = query(collection(db, "Favourites_user" + user.uid), where("fav_category", "==", category));
    const querySnapshot = await getDocs(fav);
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setFavouritesArray(array);
  }

  useEffect(() => {
    user &&
    getLocalFavourites();
  }, []);

  function checkForFav() {
    let alreadyFavourited = false;
    for (let i = 0; i < favouritesArray.length; i++) {
      if (favouritesArray[i].name === selectedClass.name) {
        alreadyFavourited = true;
        break;
      }
    }
    return alreadyFavourited;
  }

  const alreadyFavourited = (checkForFav());

  return (
    <>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      {!pageLoader && 
        <>
          <h4 className='ec-h4'>{category}</h4>
          {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult} {searchResult === "Favourite " && <>{category}</>}"</h4>}
          <div className='cycle-buttons-div'>
            <CyclePrev prev={prev} handleOnClick={handleOnClick} />
            <div className='add-fav-container'>
              <h1>{selectedClass.name}</h1>
              {user && 
                <>
                  {!alreadyFavourited && <button className='not-fav-button' title={"Add to Favourites"} onClick={() => addFavourite()}>♥</button>}
                  {alreadyFavourited && <button className='fav-button' title={selectedClass.name + " is in your Favourites"} disabled>♥</button>}
                </>
              }
            </div>
            <CycleNext next={next} handleOnClick={handleOnClick} />
          </div>
          {selectedClass.proficiencies && <DisplayClass props={selectedClass} />}
          {selectedClass.class && <DisplaySubclass props={selectedClass} handleOnClick={handleOnClick} />}
        </>
      }
    </>
  )
}

export default SelectedClass