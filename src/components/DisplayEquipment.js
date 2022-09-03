import React from 'react'

function DisplayEquipment(props) {
    const selectedEquipment = props.props;

    function gearCategory() {
        if (selectedEquipment.gear_category) {
            return (
                <>
                    <h4>Gear Category</h4>
                    <p>{selectedEquipment.gear_category.name}</p>
                    <hr/>
                </>
            )
        }
    }

    function rarity() {
        if (selectedEquipment.rarity) {
            return (
                <>
                    <h4>Rarity</h4>
                    <p>{selectedEquipment.rarity.name}</p>
                    <hr/>
                </>
            )
        }
    }

    function weight() {
        if (selectedEquipment.weight) {
            return <p>{selectedEquipment.weight}</p>
        } else {
            return <p>N/A</p>
        }
    }

    function cost() {
        if (selectedEquipment.cost) {
            return <p>{selectedEquipment.cost.quantity} <b>{selectedEquipment.cost.unit}</b></p>
        } else {
            return <p>N/A</p>
        }
    }

    function equipmentDescription() {
        if (selectedEquipment.desc.length > 0) {
            return (
                <>
                    <h4>Description</h4>
                    {selectedEquipment.desc.map((item, i) => {
                        return (
                        <p key={i}>{item}</p>
                        )
                    })}
                </>
            )
        }
    }

    if (selectedEquipment.url) {
  return (
    <div className='content-container'>

        <div className='display'>
            <h4>Equipment Category</h4>
            <p>{selectedEquipment.equipment_category.name}</p>

        <hr/>

            {gearCategory()}

            {rarity()}


            <div className='e-choices'>
                <div className='cost-weight'>
                    <h4>Cost</h4>
                    {cost()}
                </div>
                <div className='cost-weight'>
                    <h4>Weight</h4>
                    {weight()}
                </div>
            </div>

        <hr/>

            {equipmentDescription()}
            
        </div>
    </div>
  )
}}

export default DisplayEquipment