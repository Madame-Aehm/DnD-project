import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

function SelectedTrait() {
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
    selected: selectedTrait, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedTrait);

  async function addFavourite() {
    if (alreadyFavourited) {
      alert(selectedTrait.name + " is already in your favourites.")
    } else {
      try {
        const docRef = await addDoc(collection(db, "Favourites_user" + user.uid), {
          name: selectedTrait.name,
          url: selectedTrait.url,
          index: selectedTrait.index,
          fav_category: category
        });
        console.log("Document written with ID: ", docRef.id);
        alert(selectedTrait.name + " added to Favourites!")
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
      if (favouritesArray[i].name === selectedTrait.name) {
        alreadyFavourited = true;
        break;
      }
    }
    return alreadyFavourited;
  }

  const alreadyFavourited = (checkForFav());

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader &&
        <>  
          <h4 className='ec-h4'>{category}</h4>
          {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult} {searchResult === "Favourite " && <>{category}</>}"</h4>}
          <div className='cycle-buttons-div'>
              <CyclePrev prev={prev} handleOnClick={handleOnClick} />
              <div className='add-fav-container'>
              <h1>{selectedTrait.name}</h1>
              {user && 
                <>
                  {!alreadyFavourited && <button className='not-fav-button' title={"Add to Favourites"} onClick={() => addFavourite()}>♥</button>}
                  {alreadyFavourited && <button className='fav-button' title={selectedTrait.name + " is in your Favourites"} disabled>♥</button>}
                </>
              }
            </div>
              <CycleNext next={next} handleOnClick={handleOnClick} />
          </div>
          <div className='display'>
            <h4>Races</h4>
            {selectedTrait.races.length === 0 && <p>-</p>}
            {selectedTrait.races.length > 0 && 
              <>
                <div className='mini-h-list'>
                  {selectedTrait.races.map((item) => {
                    return <h6 key={item.index}>{item.name}</h6>
                  })}
                </div>
              </>
            }

            <h4>Subraces</h4>
            {selectedTrait.subraces.length === 0 && <p>-</p>}
            {selectedTrait.subraces.length > 0 && 
              <>
                <div className='mini-h-list'>
                  {selectedTrait.subraces.map((item) => {
                    return <h6 key={item.index}>{item.name}</h6>
                  })}
                </div>
              </>
            }
            <hr/>

            <h4>Description</h4>
            {selectedTrait.desc.map((item) => {
              return <p key={item}>{item}</p>
            })}

          </div>
        </>
      }
    </div>
  )
}

export default SelectedTrait