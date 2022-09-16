import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import DisplayEquipment from '../components/DisplayEquipment';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';
import { AuthContext } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import DisplayClass from '../components/DisplayClass';
import DisplayMonster from '../components/DisplayMonster';
import DisplayBg from '../components/DisplayBg';
import DisplaySubclass from '../components/DisplaySubclass';
import DisplayFeature from '../components/DisplayFeature';
import DisplayRace from '../components/DisplayRace';
import DisplaySubrace from '../components/DisplaySubrace';
import DisplayProficiency from '../components/DisplayProficiency';
import DisplaySpell from '../components/DisplaySpell';
import DisplayTrait from '../components/DisplayTrait';
import DisplayCondition from '../components/DisplayCondition';
import DisplayDamageType from '../components/DisplayDamageType';
import DisplayFeat from '../components/DisplayFeat';
import DisplayLanguage from '../components/DisplayLanguage';
import DisplayMagicSchool from '../components/DisplayMagicSchool';
import DisplaySkill from '../components/DisplaySkill';
import DisplayWP from '../components/DisplayWP';

function Selected() {
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
    selected,
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selected);

  async function addFavourite() {
    if (alreadyFavourited) {
      alert(selected.name + " is already in your favourites.")
    } else {
      try {
        const docRef = await addDoc(collection(db, "Favourites_user" + user.uid), {
          name: selected.name,
          url: selected.url,
          index: selected.index,
          fav_category: category
        });
        console.log("Document written with ID: ", docRef.id);
        alert(selected.name + " added to Favourites!")
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
      if (favouritesArray[i].name === selected.name) {
        alreadyFavourited = true;
        break;
      }
    }
    return alreadyFavourited;
  }

  const alreadyFavourited = (checkForFav());

  return (
    <div>
        <NavBar/>
        {error && <p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader &&
          <>  
            <h4 className='ec-h4'>{category}</h4>
            {(searchResult !== "" && searchResult !== " ") && <h4 className='ec-h4'>Showing results for "{searchResult} {searchResult === "Favourite " && <>{category}</>}"</h4>}
            <div className='cycle-buttons-div'>
              <CyclePrev prev={prev} handleOnClick={handleOnClick} />
              <div className='add-fav-container'>
                <h1>{selected.name}</h1>
                {user && 
                  <>
                    {!alreadyFavourited && <button className='not-fav-button' title={"Add to Favourites"} onClick={() => addFavourite()}>♥</button>}
                    {alreadyFavourited && <button className='fav-button' title={selected.name + " is in your Favourites"} disabled>♥</button>}
                  </>
                }
              </div>
              <CycleNext next={next} handleOnClick={handleOnClick} />
            </div>
            {category === "Backgrounds" && <DisplayBg props={selected} />}
            {category === "Classes" && <DisplayClass props={selected} />}
            {category === "Subclasses" && <DisplaySubclass props={selected} />}
            {category === "Conditions" && <DisplayCondition props={selected} />}
            {category === "Damage Types" && <DisplayDamageType props={selected} />}
            {(category === "Equipment" || category === "Magic Items") && <DisplayEquipment props={selected}/>}
            {category === "Feats" && <DisplayFeat props={selected} />}
            {category === "Features" && <DisplayFeature props={selected} />}
            {category === "Languages" && <DisplayLanguage props={selected} />}
            {category === "Magic Schools" && <DisplayMagicSchool props={selected} />}
            {category === "Monsters" && <DisplayMonster props={selected} />}
            {category === "Proficiencies" && <DisplayProficiency props={selected} />}
            {category === "Races" && <DisplayRace props={selected} />}
            {category === "Subraces" && <DisplaySubrace props={selected} />}
            {category === "Skills" && <DisplaySkill props={selected} />}
            {category === "Spells" && <DisplaySpell props={selected} />}
            {category === "Traits" && <DisplayTrait props={selected} />}
            {category === "Weapon Properties" && <DisplayWP props={selected} />}
          </>
        }
    </div>
  )
}

export default Selected