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
  const equipmentArray = favouritesArray.filter((item) => item.fav_category === "Equipment");
  const magicItemsArray = favouritesArray.filter((item) => item.fav_category === "Magic Items");
  const monstersArray = favouritesArray.filter((item) => item.fav_category === "Monsters");
  const spellsArray = favouritesArray.filter((item) => item.fav_category === "Spells");
  const featuresArray = favouritesArray.filter((item) => item.fav_category === "Features");
  const classesArray = favouritesArray.filter((item) => item.fav_category === "Classes");
  const racesArray = favouritesArray.filter((item) => item.fav_category === "Races");
  const traitsArray = favouritesArray.filter((item) => item.fav_category === "Traits");

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
    if (window.confirm("Are you sure you want to delete " + favourite.name + "?")) {
      const newArray = favouritesArray.filter((v) => v.id != favourite.id);
      setFavouritesArray(newArray);
      await deleteDoc(doc(db, "Favourites_user" + user.uid, favourite.id));
      alert(favourite.name + "deleted.")
    }
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
            <option value={"Equipment"}>Equipment</option>
            <option value={"Magic Items"}>Magic Items</option>
            <option value={"Monsters"}>Monsters</option>
            <option value={"Spells"}>Spells</option>
            <option value={"Features"}>Features</option>
            <option value={"Classes"}>Classes/Subclasses</option>
            <option value={"Races"}>Races/Subraces</option>
            <option value={"Traits"}>Traits</option>
          </select>
        </div>

        {(selectedFav === "Equipment" || selectedFav === "all") && <>
          <h3>Equipment</h3>
          <DisplayFavourite array={equipmentArray} deleteFavourite={deleteFavourite} linkTo={"/selectedequipment"} />
        </>}
        {(selectedFav === "Magic Items" || selectedFav === "all") && <>
          <h3>Magic Items</h3>
          <DisplayFavourite array={magicItemsArray} deleteFavourite={deleteFavourite} linkTo={"/selectedequipment"} />
        </>}
        {(selectedFav === "Monsters" || selectedFav === "all") && <>
          <h3>Monsters</h3>
          <DisplayFavourite array={monstersArray} deleteFavourite={deleteFavourite} linkTo={"/selectedmonster"} />
        </>}
        {(selectedFav === "Spells" || selectedFav === "all") && <>
          <h3>Spells</h3>
          <DisplayFavourite array={spellsArray} deleteFavourite={deleteFavourite} linkTo={"/selectedspell"} />
        </>}
        {(selectedFav === "Features" || selectedFav === "all") && <>
          <h3>Features</h3>
          <DisplayFavourite array={featuresArray} deleteFavourite={deleteFavourite} linkTo={"/selectedfeature"} />
        </>}
        {(selectedFav === "Classes" || selectedFav === "all") && <>
          <h3>Classes</h3>
          <DisplayFavourite array={classesArray} deleteFavourite={deleteFavourite} linkTo={"/selectedclass"} />
        </>}
        {(selectedFav === "Races" || selectedFav === "all") && <>
          <h3>Races</h3>
          <DisplayFavourite array={racesArray} deleteFavourite={deleteFavourite} linkTo={"/selectedrace"} />
        </>}
        {(selectedFav === "Traits" || selectedFav === "all") && <>
          <h3>Traits</h3>
          <DisplayFavourite array={traitsArray} deleteFavourite={deleteFavourite} linkTo={"/selectedtrait"} />
        </>}


      </>}
    </div>
  )
}

export default Favourites