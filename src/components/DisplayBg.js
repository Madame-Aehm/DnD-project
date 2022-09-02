import React from 'react'

function DisplayBg(props) {
    const selectedBg = props.props;
    if (selectedBg.bonds) {
  return (
    <div className='content-container'>
        <h1>{selectedBg.name}</h1>
        <div className='class-container'>

            <h4>Language Options</h4>
            <p>Choose: <b>{selectedBg.language_options.choose}</b></p>

    <hr/>

            <h4>Starting Proficiencies</h4>
            <div className='mini-h-list'>
                {selectedBg.starting_proficiencies.map((item) => {
                    return (
                    <h6 key={item.index}>{item.name}</h6>
                    )
                })}
            </div>

    <hr/>

            <h4>Starting Equipment</h4>
            <table>
                <tbody>
                    {selectedBg.starting_equipment.map((item) => {
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

            <h4>Starting Equipment Options</h4>
            {selectedBg.starting_equipment_options.map((item) => {
                return (
                    <div key={item.from.equipment_category.index}>
                        <h5>Choose {item.choose} from:</h5>
                        <p>{item.from.equipment_category.name}</p>
                    </div>
                )
            })}

    <hr/>

            <h4>Feature</h4>
            {selectedBg.feature.desc.map((item, i) => {
                return (
                    <p key={i}>{item}</p>
                )
            })}

    <hr/>

            <h4>Bonds</h4>
            <h5>Choose {selectedBg.bonds.choose} from:</h5>
            <ul>
                {selectedBg.bonds.from.options.map((item, i) => {
                    return (
                        <li key={i}>"{item.string}"</li>
                    )
                })}
            </ul>

    <hr/>

            <h4>Flaws</h4>
            <h5>Choose {selectedBg.flaws.choose} from:</h5>
            <ul>
                {selectedBg.flaws.from.options.map((item, i) => {
                    return (
                        <li key={i}>"{item.string}"</li>
                    )
                })}
            </ul>

    <hr/>

            <h4>Ideals</h4>
            <h5>Choose {selectedBg.ideals.choose} from:</h5>
            {selectedBg.ideals.from.options.map((item, i) => {
                return (
                    <div key={i}>
                        <p>"{item.desc}"</p>
                        <h6 className='aligns-with'>Aligns with:</h6>
                        <div className='mini-h-list'>
                            
                            {item.alignments.map((alignment) => {
                                return <h6 key={alignment.index}>{alignment.name}</h6>
                            })}
                        </div>
                        <hr/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}}

export default DisplayBg