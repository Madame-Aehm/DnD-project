import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

function Favourites() {
  const { user } = useContext(AuthContext);
  const [pageLoader, setPageLoader] = useState(true);
  const [favouritesArray, setFavouritesArray] = useState([]);
  const equipmentArray = favouritesArray.filter((item) => item.fav_category === "Equipment");
  const magicItemsArray = favouritesArray.filter((item) => item.fav_category === "Magic Items");
  const monstersArray = favouritesArray.filter((item) => item.fav_category === "Monsters");
  const spellsArray = favouritesArray.filter((item) => item.fav_category === "Spells");

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
      alert(favourite.name + " has been deleted.");
    }
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

        <h3>Equipment</h3>
        <div className='character-card-display'>
          {equipmentArray.length === 0 && <p>You haven't favourited any Equipment</p>}
          {equipmentArray.length > 0 && equipmentArray.map((item) => {
            return (
              <div className='character-card' key={item.id}>
                <h4>{item.name}</h4>
                <Link 
                  to={"/selectedequipment"} 
                  state={{url: item.url, 
                    array: equipmentArray, 
                    searchResult: "Favourite ", 
                    category: item.fav_category}}>
                  View Page
                </Link>
                <button onClick={() => deleteFavourite(item)}>Delete</button>
              </div>
            )
          })}
        </div>

        <h3>Magic Items</h3>
        <div className='character-card-display'>
          {magicItemsArray.length === 0 && <p>You haven't favourited any Magic Items</p>}
          {magicItemsArray.length > 0 && magicItemsArray.map((item) => {
            return (
              <div className='character-card' key={item.id}>
                <h4>{item.name}</h4>
                <Link
                  to={"/selectedequipment"}
                  state={{url: item.url, 
                    array: magicItemsArray, 
                    searchResult: "Favourite ", 
                    category: item.fav_category}}>
                  View Page
                </Link>
                <button onClick={() => deleteFavourite(item)}>Delete</button>
              </div>
            )
          })}
        </div>
        
        <h3>Monsters</h3>
        <div className='character-card-display'>
          {monstersArray.length === 0 && <p>You haven't favourited any Monsters</p>}
          {monstersArray.length > 0 && monstersArray.map((item) => {
            return (
              <div className='character-card' key={item.id}>
                <h4>{item.name}</h4>
                <Link
                  to={"/selectedmonster"}
                  state={{url: item.url, 
                    array: monstersArray, 
                    searchResult: "Favourite ", 
                    category: item.fav_category}}>
                  View Page
                </Link>
                <button onClick={() => deleteFavourite(item)}>Delete</button>
              </div>
            )
          })}
        </div>

        <h3>Spells</h3>
        <div className='character-card-display'>
          {spellsArray.length === 0 && <p>You haven't favourited any Monsters</p>}
          {spellsArray.length > 0 && spellsArray.map((item) => {
            return (
              <div className='character-card' key={item.id}>
                <h4>{item.name}</h4>
                <Link
                  to={"/selectedspell"}
                  state={{url: item.url, 
                    array: spellsArray, 
                    searchResult: "Favourite ", 
                    category: item.fav_category}}>
                  View Page
                </Link>
                <button onClick={() => deleteFavourite(item)}>Delete</button>
              </div>
            )
          })}
        </div>

      </>}
    </div>
  )
}

export default Favourites