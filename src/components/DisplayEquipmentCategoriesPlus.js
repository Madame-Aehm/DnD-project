import React from 'react'
import { Link } from 'react-router-dom'

function DisplayEquipmentCategoriesPlus(props) {
  const selectedEquipmentCategory = props.props;
  console.log(props)



  if (selectedEquipmentCategory.index) {
    return (
        <div className='content-container'>
            <input className='textbox' type={"text"} placeholder={"Search"} ></input>
            <div className='explore-list'>
            {selectedEquipmentCategory.equipment.map((item) => {
                return (
                <Link className='explore-button' to={"/selectedequipment"} state={{url: item.url, array: selectedEquipmentCategory.equipment}} key={item.index}>{item.name}</Link>
                )
            })}
            </div>
        </div>
    )
} else {
    return (<p>problem</p>)
}
}

export default DisplayEquipmentCategoriesPlus