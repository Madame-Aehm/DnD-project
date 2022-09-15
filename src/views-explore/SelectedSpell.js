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

function SelectedSpell() {

  const { user } = useContext(AuthContext);
  const [favouritesArray, setFavouritesArray] = useState([]);
  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;
  const category = location.state.category;

  const {
    selected: selectedSpell, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`);

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedSpell);

  async function addFavourite() {
    if (alreadyFavourited) {
      alert(selectedSpell.name + " is already in your favourites.")
    } else {
      try {
        const docRef = await addDoc(collection(db, "Favourites_user" + user.uid), {
          name: selectedSpell.name,
          url: selectedSpell.url,
          index: selectedSpell.index,
          fav_category: category
        });
        console.log("Document written with ID: ", docRef.id);
        alert(selectedSpell.name + " added to Favourites!")
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
      if (favouritesArray[i].name === selectedSpell.name) {
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
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      {!pageLoader &&
        <>
          <h4 className='ec-h4'>Spells</h4>
          {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult} {searchResult === "Favourite " && <>{category}</>}"</h4>}
          <div className='cycle-buttons-div'>
              <CyclePrev prev={prev} handleOnClick={handleOnClick} />
              <div className='add-fav-container'>
                <h1>{selectedSpell.name}</h1>
                {user && 
                  <>
                    {!alreadyFavourited && <button className='not-fav-button' title={"Add to Favourites"} onClick={() => addFavourite()}>♥</button>}
                    {alreadyFavourited && <button className='fav-button' title={selectedSpell.name + " is in your Favourites"} disabled>♥</button>}
                  </>
                }
              </div>
              <CycleNext next={next} handleOnClick={handleOnClick} />
          </div>

          <div className='display'>
          <h4>Summary</h4>
            <table className='spell-table'>
              <tbody>
                <tr>
                  <th>Type: </th>
                  {selectedSpell.attack_type && <td>{selectedSpell.attack_type}</td>}
                  {!selectedSpell.attack_type && <td> - </td>}
                  <th>Range: </th>
                  <td>{selectedSpell.range}</td>
                </tr>
                <tr>
                  <th>Time: </th>
                  <td>{selectedSpell.casting_time}</td>
                  <th>Duration: </th>
                  <td>{selectedSpell.duration}</td>
                </tr>
                <tr>
                  <th>Damage: </th>
                  {selectedSpell.damage && <td>{selectedSpell.damage.damage_type.name}</td>}
                  {!selectedSpell.damage && <td> - </td>}
                  <th>Level</th>
                  <td>{selectedSpell.level}</td>
                </tr>
              </tbody>
            </table>
            <hr/>

            {selectedSpell.material && 
              <>
                <h4>Material</h4>
                <p>{selectedSpell.material}</p>
              </>
            }

            <h4>Description</h4>
            {selectedSpell.desc.map((item) => {
              return <p key={item}>{item}</p>
            })}

            {selectedSpell.higher_level.length > 0 &&
              <>
              <h4>Higher Level</h4>
              {selectedSpell.higher_level.map((item) => {
                return <p key={item}>{item}</p>
              })}
              </>
            }
            

          </div>
        </>
      }
        

    </div>
  )
}

export default SelectedSpell