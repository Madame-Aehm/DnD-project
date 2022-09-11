import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import DisplayMonster from '../components/DisplayMonster';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedMonster() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;

  const {
    selected: selectedMonster, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedMonster);

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      <h4 className='ec-h4'>Monsters</h4>
      {!pageLoader &&
            <>
              {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult}"</h4>}
              <div className='cycle-buttons-div'>
                  <CyclePrev prev={prev} handleOnClick={handleOnClick} />
                  <h1>{selectedMonster.name}</h1>
                  <CycleNext next={next} handleOnClick={handleOnClick} />
              </div>

              <DisplayMonster props={selectedMonster} />
            </>
        }
    </div>
  )
}

export default SelectedMonster