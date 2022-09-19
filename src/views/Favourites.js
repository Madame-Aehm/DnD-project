import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import DisplayFavourite from '../components/DisplayFavourite';

function Favourites() {
  const { user } = useContext(AuthContext);
  const [pageLoader, setPageLoader] = useState(true);
  const [favouritesArray, setFavouritesArray] = useState([]);
  const [selectedFav, setSelectedFav] = useState("all");
  const backgroundsArray = favouritesArray.filter((item) => item.fav_category === "Backgrounds");
  const classesArray = favouritesArray.filter((item) => item.fav_category === "Classes");
  const subclassesArray = favouritesArray.filter((item) => item.fav_category === "Subclasses");
  const conditionsArray = favouritesArray.filter((item) => item.fav_category === "Conditions");
  const damageTypesArray = favouritesArray.filter((item) => item.fav_category === "Damage Types");
  const equipmentArray = favouritesArray.filter((item) => item.fav_category === "Equipment");
  const featsArray = favouritesArray.filter((item) => item.fav_category === "Feats");
  const featuresArray = favouritesArray.filter((item) => item.fav_category === "Features");
  const languagesArray = favouritesArray.filter((item) => item.fav_category === "Languages");
  const magicItemsArray = favouritesArray.filter((item) => item.fav_category === "Magic Items");
  const magicSchoolsArray = favouritesArray.filter((item) => item.fav_category === "Magic Schools");
  const monstersArray = favouritesArray.filter((item) => item.fav_category === "Monsters");
  const proficienciesArray = favouritesArray.filter((item) => item.fav_category === "Proficiencies");
  const racesArray = favouritesArray.filter((item) => item.fav_category === "Races");
  const subracesArray = favouritesArray.filter((item) => item.fav_category === "Subraces");
  const ruleSectionsArray = favouritesArray.filter((item) => item.fav_category === "Rule Sections");
  const rulesArray = favouritesArray.filter((item) => item.fav_category === "Rules");
  const skillsArray = favouritesArray.filter((item) => item.fav_category === "Skills");
  const spellsArray = favouritesArray.filter((item) => item.fav_category === "Spells");
  const traitsArray = favouritesArray.filter((item) => item.fav_category === "Traits");
  const WPArray = favouritesArray.filter((item) => item.fav_category === "Weapon Properties");

  async function getFavourites () {
    const querySnapshot = await getDocs(collection(db, "Favourites_user" + user.uid));
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setFavouritesArray(array);
    setTimeout(() => {
      setPageLoader(false);
    }, 1000);
  }

  async function deleteFavourite (favourite) {
      const newArray = favouritesArray.filter((v) => v.id != favourite.id);
      setFavouritesArray(newArray);
      await deleteDoc(doc(db, "Favourites_user" + user.uid, favourite.id));
  }

  const handleOnChange = (e) => {
    setSelectedFav(e.target.value);
  }

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div className='content-container'>
      <NavBar/>
      {pageLoader &&<Loader/>}
      {!pageLoader && <>
        <h1>Favourites</h1>
        <div className='select-fav-div'>
          <label htmlFor='select-fav'>Show...</label>
          <select id='select-fav' onChange={handleOnChange}>
            <option value={"all"}>All</option>
            <option value={"Backgrounds"}>Backgrounds</option>
            <option value={"Classes"}>Classes</option>
            <option value={"Subclasses"}>Subclasses</option>
            <option value={"Conditions"}>Conditions</option>
            <option value={"Damage Types"}>Damage Types</option>
            <option value={"Equipment"}>Equipment</option>
            <option value={"Feats"}>Feats</option>
            <option value={"Features"}>Features</option>
            <option value={"Languages"}>Languages</option>
            <option value={"Magic Items"}>Magic Items</option>
            <option value={"Magic Schools"}>Magic Schools</option>
            <option value={"Monsters"}>Monsters</option>
            <option value={"Proficiencies"}>Proficiencies</option>
            <option value={"Races"}>Races</option>
            <option value={"Subraces"}>Subraces</option>
            <option value={"Rule Sections"}>Rule Sections</option>
            <option value={"Rules"}>Rules</option>
            <option value={"Skills"}>Skills</option>
            <option value={"Spells"}>Spells</option>
            <option value={"Traits"}>Traits</option>
            <option value={"Weapon Properties"}>Weapon Properties</option>
          </select>
        </div>

        {(selectedFav === "Backgrounds" || selectedFav === "all") && <>
          <h3>Backgrounds</h3>
          <DisplayFavourite array={backgroundsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Classes" || selectedFav === "all") && <>
          <h3>Classes</h3>
          <DisplayFavourite array={classesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Subclasses" || selectedFav === "all") && <>
          <h3>Subclasses</h3>
          <DisplayFavourite array={subclassesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Conditions" || selectedFav === "all") && <>
          <h3>Conditions</h3>
          <DisplayFavourite array={conditionsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Damage Types" || selectedFav === "all") && <>
          <h3>Damage Types</h3>
          <DisplayFavourite array={damageTypesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Equipment" || selectedFav === "all") && <>
          <h3>Equipment</h3>
          <DisplayFavourite array={equipmentArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Feats" || selectedFav === "all") && <>
          <h3>Feats</h3>
          <DisplayFavourite array={featsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Features" || selectedFav === "all") && <>
          <h3>Features</h3>
          <DisplayFavourite array={featuresArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Languages" || selectedFav === "all") && <>
          <h3>Languages</h3>
          <DisplayFavourite array={languagesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Magic Items" || selectedFav === "all") && <>
          <h3>Magic Items</h3>
          <DisplayFavourite array={magicItemsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Magic Schools" || selectedFav === "all") && <>
          <h3>Magic Schools</h3>
          <DisplayFavourite array={magicSchoolsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Monsters" || selectedFav === "all") && <>
          <h3>Monsters</h3>
          <DisplayFavourite array={monstersArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Proficiencies" || selectedFav === "all") && <>
          <h3>Proficiencies</h3>
          <DisplayFavourite array={proficienciesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Races" || selectedFav === "all") && <>
          <h3>Races</h3>
          <DisplayFavourite array={racesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Subraces" || selectedFav === "all") && <>
          <h3>Subraces</h3>
          <DisplayFavourite array={subracesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Rule Sections" || selectedFav === "all") && <>
          <h3>Rule Sections</h3>
          <DisplayFavourite array={ruleSectionsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Rules" || selectedFav === "all") && <>
          <h3>Rules</h3>
          <DisplayFavourite array={rulesArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Skills" || selectedFav === "all") && <>
          <h3>Skills</h3>
          <DisplayFavourite array={skillsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Spells" || selectedFav === "all") && <>
          <h3>Spells</h3>
          <DisplayFavourite array={spellsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Traits" || selectedFav === "all") && <>
          <h3>Traits</h3>
          <DisplayFavourite array={traitsArray} deleteFavourite={deleteFavourite} />
        </>}
        {(selectedFav === "Weapon Properties" || selectedFav === "all") && <>
          <h3>Weapon Properties</h3>
          <DisplayFavourite array={WPArray} deleteFavourite={deleteFavourite} />
        </>}
      </>}
    </div>
  )
}

export default Favourites