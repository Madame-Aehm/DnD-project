import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import DisplayEquipmentCategories from '../components/DisplayEquipmentCategories';
import NavBar from '../components/NavBar'

function SelectedEquipmentCategory() {

    const location = useLocation();
    const restURL = location.state.url;
    const cycleArray = location.state.array;
    const [controlList, setControlList] = useState([]);
    const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState([]);

    const fetchList = async() => {
        try {
        const response = await fetch(`https://www.dnd5eapi.co${restURL}`);
        const result = await response.json();
        setSelectedEquipmentCategory(result);
        console.log(result);
        setControlList(result.equipment);
      } catch (error) {
        console.log("error", error)
      }
    }
  
    useEffect(() => {
        fetchList();
      }, []);

    const cycleFetch = async(URL) => {
        try {
            const response = await fetch(`https://www.dnd5eapi.co${URL}`);
            const result = await response.json();
            setSelectedEquipmentCategory(result);
            setControlList(result.equipment);
        } catch (error) {
            console.log("error", error)
        }
    }

    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");

    function findArrayPosition() {
        for (let i = 0; i < cycleArray.length; i++) {
            if (cycleArray[i].index === selectedEquipmentCategory.index) {
                cycleArray[i + 1] ? setNext(cycleArray[i + 1].url) : setNext("end");
                cycleArray[i - 1] ? setPrev(cycleArray[i - 1].url) : setPrev("end");
            }
        }
    }

    useEffect(() => {
        findArrayPosition();
    }, [selectedEquipmentCategory])

    function nextButton() {
        if (next === "end") {
            return (
                <button className='cycle' disabled>↠</button>
            )
        } else {
            return (
                <button className='cycle' onClick={() => cycleFetch(next)}>↠</button>
            )
        }
    }

    function prevButton() {
        if (prev === "end") {
            return (
                <button className='cycle' disabled>↞</button>
            )
        } else {
            return (
                <button className='cycle' onClick={() => cycleFetch(prev)}>↞</button>
            )
        }
    }

  return (
    <div>
        <NavBar/>
        <div className='cycle-buttons-div'>
            {prevButton()}
            <h1>{selectedEquipmentCategory.name}</h1>
            {nextButton()}
        </div>
        {/* <div className='equip-cat-input-div'>
            <input className='textbox' type={"text"} placeholder={"Search"} onChange={(e) => filter(e.target)}></input>
        </div> */}
        <DisplayEquipmentCategories props={selectedEquipmentCategory} controlList={controlList}/>
    </div>
  )
}

export default SelectedEquipmentCategory