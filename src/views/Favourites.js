import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Favourites() {
  const { user } = useContext(AuthContext);

  const [favouritesArray, setFavouritesArray] = useState([]);

  async function getFavourites () {
    const querySnapshot = await getDocs(collection(db, "Favourites_user" + user.uid));
    const array = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      array.push(data);
    });
    setFavouritesArray(array);
  }

  useEffect(() => {
    getFavourites();
  }, []);
  

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Favourites</h1>
      <div className='add-fav-container'>
        <p>Show...</p>
        <select>
          <option value={""}>All</option>
          <option value={"Equipment"}>Equipment</option>
          <option value={"Magic Items"}>Magic Items</option>
        </select>
      </div>
      <div className='character-card-display'>
        {favouritesArray.map((favourite) => {
        return (
          <div className='character-card' key={favourite.id}>
            <h4>{favourite.name}</h4>
            <Link 
              to={"/selectedequipment"} 
              state={{url: favourite.url, 
                array: favouritesArray, 
                searchResult: "Favourite ", 
                category: favourite.fav_category}}>
              View Page
            </Link>
            {/* <button onClick={() => deleteCharacter(character)}>Delete</button> */}
        </div>
        )
      })}
      </div>
      
    </div>
  )
}

export default Favourites