import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DisplayRace from '../components/DisplayRace';
import DisplaySubrace from '../components/DisplaySubrace';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'

function SelectedRace() {

  const location = useLocation();
  const restURL = location.state.url;
  const cycleArray = location.state.array;
  const [selectedRace, setSelectedRace] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const cycleFetch = async(URL) => {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${URL}`);
      const result = await response.json();
      setSelectedRace(result);
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
      if (cycleArray[i].index === selectedRace.index) {
        cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
        cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
      }
    }
  }

  useEffect(() => {
    findArrayPosition();
  }, [selectedRace])

  function nextButton() {
    if (next === "end") {
      return (
        <button className='cycle' disabled>↠</button>
      )
    } else {
      return (
        <button className='cycle' onClick={() => {
          setPageLoader(true);
          cycleFetch(next)
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
          cycleFetch(prev)
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
          <div className='cycle-buttons-div'>
            {prevButton()}
            <h1>{selectedRace.name}</h1>
            {nextButton()}
          </div>
          {selectedRace.subraces && <DisplayRace props={selectedRace} />}
          {selectedRace.race && <DisplaySubrace props={selectedRace} />}
        </>
      }

    </div>
  )
}

export default SelectedRace