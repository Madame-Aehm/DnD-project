import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function DamageTypes() {

  const {
    object,
    array: damageTypesList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/damage-types");

  async function scoreFetch(restURL) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setDamageType(result);
        setLoader(false);
    } catch (error) {
        console.log("error", error)
        setSubError(error);
        setLoader(false);
    }
  }

  const [loader, setLoader] = useState(true);
  const [subError, setSubError] = useState(null);
  const [damageType, setDamageType] = useState({})

  function setFirstCheck() {
    const allChecks = document.querySelectorAll("input[type='radio']");
    const firstCheck = document.querySelector("input[type='radio']");
    let isChecked = false;
    for (let i = 0; i < allChecks.length; i++) {
      if (allChecks[i].checked) {
        isChecked = true;
        break;
      }
    }
    if (!isChecked && firstCheck) {
      firstCheck.checked = true;
      scoreFetch(firstCheck.value);
    }
  }

  return (
    <div className='content-container'>
        <NavBar/>
        {error &&<p>Something went wrong.. Please reload.</p>}
        {pageLoader && <Loader/>}
        {!pageLoader && 
          <>
            <h1>Damage Types</h1>
            <div className='checkbox-container-3'>
              {damageTypesList.map((item) => {
                  return (
                      <div key={item.index}>
                          <input type={"radio"} 
                            name={"damage-types"} 
                            value={item.url} id={item.index} 
                            onChange={
                              (e) => {
                                setLoader(true);
                                scoreFetch(item.url)
                              }
                            }/>
                          <label htmlFor={item.index}><div>{item.name}</div></label>
                      </div>
                  )
              })}
            </div>
            {subError && <p>Something went wrong.. Please reload</p>}
            {loader && <p>loading...</p>}
            {!loader && 
              <div className='display'>
                <h3>{damageType.name}</h3>
                {damageType.desc.map((item, i) => {
                  return (
                      <p key={i}>{item}</p>
                  )
                })}
              </div>
            }
          </>
        }
        {setFirstCheck()}

    </div>
  )
}

export default DamageTypes