import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import DisplayRace from '../components/DisplayRace';
import DisplaySubrace from '../components/DisplaySubrace';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedRace() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;

  const {
    selected: selectedRace, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedRace);

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      <h4 className='ec-h4'>Races</h4>
      {!pageLoader && 
        <>
          <div className='cycle-buttons-div'>
            <CyclePrev prev={prev} handleOnClick={handleOnClick} />
            <h1>{selectedRace.name}</h1>
            <CycleNext next={next} handleOnClick={handleOnClick} />
          </div>
          {selectedRace.subraces && <DisplayRace props={selectedRace} />}
          {selectedRace.race && <DisplaySubrace props={selectedRace} />}
        </>
      }

    </div>
  )
}

export default SelectedRace