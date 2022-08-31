import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

function Barbarian() {

    const [barbarian, setbarbarian] = useState([]);
    const fetchList = async() => {
      if (barbarian.length === 0) {
        try {
          const response = await fetch("https://www.dnd5eapi.co/api/classes/barbarian");
          const result = await response.json();
          console.log(result);
        //   setbarbarian(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);
  

  return (
    <div className='content-container'>
        <NavBar/>
        <h1>Barbarian</h1>
        <div className='class-display'>

        </div>

    </div>
  )
}

export default Barbarian