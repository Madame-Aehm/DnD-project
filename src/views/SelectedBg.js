import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DisplayBg from '../components/DisplayBg';
import NavBar from '../components/NavBar';

function SelectedBg() {

    const location = useLocation();
    const restURL = location.state;
    const [selectedBg, setSelectedBg] = useState([]);

    const fetchList = async() => {
        try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setSelectedBg(result);
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
        <DisplayBg props={selectedBg} />
    </div>
  )
}

export default SelectedBg