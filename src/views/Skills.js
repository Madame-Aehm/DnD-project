import React, { useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar'
import useMainFetch from '../hooks/useMainFetch';

function Skills() {

  const {
    object,
    array: skillsList,
    pageLoader,
    error,
  } = useMainFetch("https://www.dnd5eapi.co/api/skills");

  async function scoreFetch(restURL) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setSkill(result);
        console.log(result)
        setLoader(false);
    } catch (error) {
        console.log("error", error)
        setSubError(error);
        setLoader(false);
    }
}

const [subError, setSubError] = useState(null);
const [skill, setSkill] = useState({})
const [loader, setLoader] = useState(true);

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
      <h1>Skills</h1>
      {error && <p>Something went wrong.. Please reload.</p>}
      {pageLoader && <Loader/>}
      {!pageLoader && 
        <>
          <div className='checkbox-container-2'>
            {skillsList.map((item) => {
              return (
                <div className='larger-checkbox' key={item.index}>
                  <input type={"radio"} 
                      name={"skills"} 
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
            {!loader &&
              <>
                <div className='display'>
                  <h3>{skill.name}</h3>
                  {skill.desc.map((item, i) => {
                    return <p key={i}>{item}</p>
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

export default Skills