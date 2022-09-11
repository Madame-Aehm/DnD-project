import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import CycleNext from '../components/CycleNext';
import CyclePrev from '../components/CyclePrev';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useFindArrayPosition from '../hooks/useFindArrayPosition';
import useSubFetch from '../hooks/useSubFetch';

function SelectedSpell() {

  const location = useLocation();
  const [restURL, setRestURL] = useState(location.state.url);
  const cycleArray = location.state.array;
  const searchResult = location.state.searchResult;

  const {
    selected: selectedSpell, 
    loader: pageLoader, 
    subError: error
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleOnClick (url) {
    setRestURL(url);
  }

  const {
    next,
    prev
  } = useFindArrayPosition(cycleArray, selectedSpell);

  return (
    <div className='content-container'>
      <NavBar/>
      {error && <div className='content-container'><p>Something went wrong.. Please reload.</p></div>}
      {pageLoader && <div className='content-container'><Loader/></div>}
      <h4 className='ec-h4'>Spells</h4>
      {!pageLoader &&
        <>  
          {searchResult !== "" && <h4 className='ec-h4'>Showing results for "{searchResult}"</h4>}
          <div className='cycle-buttons-div'>
              <CyclePrev prev={prev} handleOnClick={handleOnClick} />
              <h1>{selectedSpell.name}</h1>
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