import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import DisplayBg from '../components/DisplayBg';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedBg() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;

  const {
    selected: selectedBg, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedBg);

  return (
    <div>
        <NavBar/>
        {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
        {pageLoader && <Loader/>}
        <h4 className='ec-h4'>Backgrounds</h4>
        {!pageLoader && 
        <>
          <div className='cycle-buttons-div'>
            <CyclePrev prev={prev} handleOnClick={handleOnClick} />
            <h1>{selectedBg.name}</h1>
            <CycleNext next={next} handleOnClick={handleOnClick} />
          </div>
          <DisplayBg props={selectedBg} />
        </>
          
        }
    </div>
  )
}

export default SelectedBg