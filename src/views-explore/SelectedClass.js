import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import DisplayClass from '../components/DisplayClass';
import DisplaySubclass from '../components/DisplaySubclass';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedClass() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;

  const {
    selected: selectedClass, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedClass);

  return (
    <>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      <h4 className='ec-h4'>Classes</h4>
      {!pageLoader && 
        <>
          <div className='cycle-buttons-div'>
            <CyclePrev prev={prev} handleOnClick={handleOnClick} />
            <h1>{selectedClass.name}</h1>
            <CycleNext next={next} handleOnClick={handleOnClick} />
          </div>
          {selectedClass.proficiencies && <DisplayClass props={selectedClass} />}
          {selectedClass.class && <DisplaySubclass props={selectedClass} />}
        </>
      }
    </>
  )
}

export default SelectedClass