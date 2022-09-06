import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';
import useMainFetch from '../hooks/useMainFetch';

function Alignments() {

  const {
    controlList,
    mainList: alignmentsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/alignments");

  async function scoreFetch(restURL) {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setAlignment(result);
        setLoader(false);
      } catch (error) {
        console.log("error", error)
        setSubError(error);
        setLoader(false);
      }
    }
    const [subError, setSubError] = useState(null);
    const [loader, setLoader] = useState(true);
    const [alignment, setAlignment] = useState("")

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
      <h1>Alignments</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-2'>
            {alignmentsList.map((item) => {
                return (
                  <div className='larger-checkbox' key={item.index}>
                      <input type={"radio"} 
                        name={"alignments"} 
                        value={item.url} id={item.index} 
                        onChange={
                          (e) => {
                            setLoader(true);
                            scoreFetch(item.url)
                          }
                        }/>
                      <label htmlFor={item.index}>{item.name}</label>
                  </div>
                )
            })}
          </div>
          {subError && <p>Something went wrong.. Please reload</p>}
          {loader && <p>loading...</p>}
          <div className='display'>
            {!loader &&
              <>
                <h3>{alignment.name}</h3>
                <p>{alignment.desc}</p>
              </> 
            }
          </div>
        </>
      }
      {setFirstCheck()}

      
    </div>
  )
}

export default Alignments