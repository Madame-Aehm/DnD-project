import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';

function Alignments() {
    const [alignmentsList, setAlignmentsList] = useState([]);
    const fetchList = async() => {
      if (alignmentsList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/alignments");
          const result = await response.json();
          setAlignmentsList(result.results);
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
        } catch (error) {
          console.log("error", error)
        }
      }
  
      const [alignmentsDescription, setalignmentsDescription] = useState("");

    useEffect(() => {
        fetchList();
      }, []);

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Alignments</h1>

        <div className='alignments-container'>
            {alignmentsList.map((item) => {
                return (
                    <div className='alignments-checkbox' key={item.index}>
                        <input type={"radio"} 
                          name={"alignments"} 
                          value={item.url} id={item.index} 
                          onChange={
                            (e) => scoreFetch(item.url)
                          }/>
                        <label className='alignments-label' htmlFor={item.index}>{item.name}</label>
                    </div>
                )
            })}
        </div>
        <div className='alignments-display'>
            <p>{alignmentsDescription}</p>
        </div>
    
    
    
    </div>
  )
}

export default Alignments