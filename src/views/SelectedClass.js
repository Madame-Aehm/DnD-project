import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DisplayClass from '../components/DisplayClass';
import NavBar from '../components/NavBar'

function SelectedClass() {

  const location = useLocation();
  const restURL = location.state;
  const [selectedClass, setSelectedClass] = useState([]);

  const fetchList = async() => {
      try {
      const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
      const result = await response.json();
      setSelectedClass(result);
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
      fetchList();
    }, []);

  return (
    <div>
      <NavBar/>
      <DisplayClass props={selectedClass}/>

    </div>
  )
}

export default SelectedClass