import React from 'react'

function DisplayEquipment(props) {
    const selectedEquipment = props.props;

  return (
    <div className='content-container'>
        <div className='display'>
            <h4>Equipment Category</h4>
            <p>{selectedEquipment.equipment_category.name}</p>

        <hr/>

            {selectedEquipment.gear_category &&
                <>
                    <h4>Gear Category</h4>
                    <p>{selectedEquipment.gear_category.name}</p>
                    <hr/>
                </>
            }

            {selectedEquipment.rarity &&
                <>
                    <h4>Rarity</h4>
                    <p>{selectedEquipment.rarity.name}</p>
                    <hr/>
                </>
            }

            <div className='e-choices'>
                <div className='cost-weight'>
                    <h4>Cost</h4>
                    {!selectedEquipment.cost && <p>N/A</p>}
                    {selectedEquipment.cost && <p>{selectedEquipment.cost.quantity} <b>{selectedEquipment.cost.unit}</b></p>}
                </div>
                <div className='cost-weight'>
                    <h4>Weight</h4>
                    {!selectedEquipment.weight && <p>N/A</p>}
                    {selectedEquipment.weight && <p>{selectedEquipment.weight}</p>}
                </div>
            </div>

        <hr/>

            {selectedEquipment.desc.length > 0 &&
                <>
                    <h4>Description</h4>
                    {selectedEquipment.desc.map((item, i) => {
                        return (
                        <p key={i}>{item}</p>
                        )
                    })}
                </>
            }

            {selectedEquipment.contents && selectedEquipment.contents.length > 0 && 
                <>
                    <h4>Contents</h4>
                    <div className='mini-h-list'>
                        {selectedEquipment.contents.length === 0 && <p>Empty</p>}
                        {selectedEquipment.contents.length > 0 && selectedEquipment.contents.map((item) => {
                            return (
                                <h6 key={item.item.index}>{item.quantity} x {item.item.name}</h6>
                            )
                        })}
                    </div>
                </>
            }
            
        </div>
    </div>
  )
}

export default DisplayEquipment