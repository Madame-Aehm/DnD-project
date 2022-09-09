import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function Conditions() {

  const {
    object,
    array: conditionsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/conditions");

  async function scoreFetch(restURL) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setCondition(result);
        setLoader(false);
    } catch (error) {
        console.log("error", error)
        setSubError(error);
        setLoader(false);
    }
  }

  const [loader, setLoader] = useState(true);
  const [subError, setSubError] = useState(null);
  const [condition, setCondition] = useState({});

  function setFirstCheck() {
    const allChecks = document.querySelectorAll("input");
    const firstCheck = document.querySelector("input");
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
      <h1>Conditions</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-3'>
            {conditionsList.map((item) => {
              return (
                <div key={item.index}>
                  <input type={"radio"} 
                    name={"conditions"} 
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
          
          {loader && <p>loading...</p>}
          {!loader &&
            <>
              <div className='display'>
                <h3>{condition.name}</h3>
                  {condition.desc.map((item, i) => {
                      return (
                          <p key={i}>{item}</p>
                      )
                  })}
              </div>
            </>
          }
        </>
      }
      {setFirstCheck()}

    </div>
  )
}

export default Conditions