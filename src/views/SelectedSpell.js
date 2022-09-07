import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedSpell() {

  const location = useLocation();
  const restURL = location.state.url;
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;
  const [selectedSpell, setSelectedSpell] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const cycleFetch = async(URL) => {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${URL}`);
        const result = await response.json();
        setSelectedSpell(result);
        console.log(result);
        setPageLoader(false);
      } catch (error) {
        console.log("error", error)
        setError(error);
        setPageLoader(false);
      }
    }

    useEffect(() => {
        cycleFetch(restURL);
    }, []);

    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");

    function findArrayPosition() {
        for (let i = 0; i < cycleArray.length; i++) {
            if (cycleArray[i].index === selectedSpell.index) {
                cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
                cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
            }
        }
    }

    useEffect(() => {
        findArrayPosition();
    }, [selectedSpell]);

    function nextButton() {
      if (next === "end") {
          return (
              <button className='cycle' disabled>↠</button>
          )
      } else {
          return (
              <button className='cycle' onClick={() => {
                  setPageLoader(true);
                  cycleFetch(next);
              }}>↠</button>
          )
      }
  }

  function prevButton() {
      if (prev === "end") {
          return (
              <button className='cycle' disabled>↞</button>
          )
      } else {
          return (
              <button className='cycle' onClick={() => {
                  setPageLoader(true);
                  cycleFetch(prev);
              }}>↞</button>
          )
      }
  }

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      {!pageLoader &&
        <>  
          {searchResult !== "" && <h4 className='ec-h4'>Showing results from "{searchResult}"</h4>}
          <div className='cycle-buttons-div'>
              {prevButton()}
              <h1>{selectedSpell.name}</h1>
              {nextButton()}
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