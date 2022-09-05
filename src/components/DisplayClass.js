import React from 'react'

function DisplayClass(props) {
    const selectedClass = props.props;
    if (selectedClass.proficiencies) {
 return (
    <div className='content-container'>
            
        <div className='display'>

            <h4>Proficiencies:</h4>
            <div className='mini-h-list'>
                {selectedClass.proficiencies.map((item) => {
                    return (
                    <h6 key={item.index}>{item.name}</h6>
                    )
                })}
            </div>

    <hr/>

            <h4>Proficiency Choices:</h4>
            {selectedClass.proficiency_choices.map((item, i) => {
                return (
                <p key={i}>{item.desc}.</p>
                )
            })}
            
    <hr/>

            <h4>Starting Equipment</h4>
            <table>
                <tbody>
                    {selectedClass.starting_equipment.map((item) => {
                        return (
                        <tr key={item.equipment.index}>
                            <th>{item.quantity} x </th>
                            <td>{item.equipment.name}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>

    <hr/>

            <h4>Starting Equipment Choices</h4>
            <div className='e-choices'>
                {selectedClass.starting_equipment_options.map((item, i) => {
                    return (
                    <div key={i}>
                        <h5>Choose {item.choose} from:</h5>
                        <p>{item.desc}</p>
                    </div>
                    )
                })}
            </div>

    <hr/>

            {selectedClass.spellcasting &&
                <div>
                    <h4>Spellcasting (Ability: {selectedClass.spellcasting.spellcasting_ability.name})</h4>
                    {selectedClass.spellcasting.info.map((item) => {
                    return (
                        <div key={item.name}>
                        <h5>{item.name}</h5>
                        {item.desc.map((desc, i) => {
                            return (
                            <p key={i}>{desc}</p>
                            )
                        })}
                        </div>
                    )
                    })}
                </div>
            }
            {!selectedClass.spellcasting && 
                <div><h4>No Spellcasting</h4></div>
            }

    <hr/>

        </div>



    </div>
  )
}}

export default DisplayClass