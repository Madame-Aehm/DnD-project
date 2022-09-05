import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

function Alignments() {

    const [alignmentsList, setAlignmentsList] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    const [loader, setLoader] = useState(true);

    const fetchList = async() => {
      if (alignmentsList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/alignments");
          const result = await response.json();
          setAlignmentsList(result.results);
          setTimeout(() => {
            setPageLoader(false);
          }, 1000);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    async function scoreFetch(restURL) {
        try {
          const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
          const result = await response.json();
          setalignmentsDescription(result.desc);
          setalignmentsTitle(result.name);
          setLoader(false);
        } catch (error) {
          console.log("error", error)
        }
      }
      
      const [alignmentsTitle, setalignmentsTitle] = useState("")
      const [alignmentsDescription, setalignmentsDescription] = useState("");

    useEffect(() => {
        fetchList();
      }, []);

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
          {loader && <p>loading...</p>}
          <div className='display'>
            {!loader &&
              <>
                <h3>{alignmentsTitle}</h3>
                <p>{alignmentsDescription}</p>
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