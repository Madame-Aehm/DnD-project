import { useState } from 'react';
import { checkFirstCheck } from '../components/Functions';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';
import useSubFetch from '../hooks/useSubFetch';

function WeaponProperties() {

  const {
    object,
    array: WPList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/weapon-properties");

  const [restURL, setRestURL] = useState("/api/weapon-properties/ammunition");
  const {
    selected: WP, 
    loader, 
    subError
  } = useSubFetch(`https://www.dnd5eapi.co${restURL}`)

  function handleCheckboxChange (url) {
    setRestURL(url);
  }

  return (
    <div className='content-container'>
      <NavBar/>
      <h1>Weapon Properties</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-3'>
            {WPList.map((item) => {
                return (
                    <div key={item.index}>
                        <input type={"radio"} 
                          name={"WP"} 
                          value={item.url} id={item.index} 
                          onChange={
                            (e) => {handleCheckboxChange(item.url)}
                          }/>
                        <label htmlFor={item.index}><div>{item.name}</div></label>
                    </div>
                )
            })}
          </div>
          {checkFirstCheck()}
          {subError && <p>Something went wrong.. Please reload</p>}
          {loader && <p>loading...</p>}
          {!loader && 
            <div className='display'>
              <h3>{WP.name}</h3>
              {WP.desc.map((item, i) => {
                return (
                    <p key={i}>{item}</p>
                )
              })}
            </div>
          }
        </>
      }
    </div>
  )
}

export default WeaponProperties