import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function MagicSchools() {

  const {
    object,
    array: magicSchoolsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/magic-schools");

  async function scoreFetch(restURL) {
    try {
      const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
      const result = await response.json();
      setMagicSchool(result);
      setLoader(false);
    } catch (error) {
      console.log("error", error)
      setSubError(error);
      setLoader(false);
    }
  }

  const [subError, setSubError] = useState(null);
  const [magicSchool, setMagicSchool] = useState({});
  const [loader, setLoader] = useState(true);

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
      <h1>Magic Schools</h1>
      {error &&  <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-3'>
            {magicSchoolsList.map((item) => {
                return (
                  <div key={item.index}>
                      <input type={"radio"} 
                        name={"magicschools"} 
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
          <div className='display'>
            {subError && <p>Something went wrong.. Please reload</p>}
            {!loader &&
              <>
                <h3>{magicSchool.name}</h3>
                <p>{magicSchool.desc}</p>
              </> 
            }
          </div>
        </>
      }
      {setFirstCheck()}
    </div>
  )
}

export default MagicSchools