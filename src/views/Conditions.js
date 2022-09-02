import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

function Conditions() {
    const [conditionsList, setConditionsList] = useState([]);
    const fetchList = async() => {
      if (conditionsList.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/conditions");
          const result = await response.json();
          setConditionsList(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);

    async function scoreFetch(restURL) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setConditionsDescription(result.desc);
        setconditionsTitle(result.name);
    } catch (error) {
        console.log("error", error)
    }
    }

    const [conditionsTitle, setconditionsTitle] = useState("");
    const [conditionsDescription, setConditionsDescription] = useState([]);



  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Conditions</h1>

        <div className='checkbox-container-2'>
            {conditionsList.map((item) => {
                return (
                    <div className='larger-checkbox' key={item.index}>
                        <input type={"radio"} 
                          name={"conditions"} 
                          value={item.url} id={item.index} 
                          onChange={
                            (e) => scoreFetch(item.url)
                          }/>
                        <label htmlFor={item.index}>{item.name}</label>
                    </div>
                )
            })}
        </div>

        <div className='display'>
          <h3>{conditionsTitle}</h3>
            {conditionsDescription.map((item, i) => {
                return (
                    <p key={i}>{item}</p>
                )
            })}
        </div>



    </div>
  )
}

export default Conditions