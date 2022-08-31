import React, { useState } from 'react'
import NavBar from '../components/NavBar'

function SelectedClass(restURL) {

    const [selectedClass, setSelectedClass] = useState([]);
    const fetchList = async() => {
      if (selectedClass.length === 0) {
        try {
          const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
          const result = await response.json();
          console.log(result);
          setSelectedClass(result.results);
        } catch (error) {
          console.log("error", error)
        }
      }
    }

    useEffect(() => {
        fetchList();
      }, []);

  return (
    <div>
        <NavBar/>

    </div>
  )
}

export default SelectedClass