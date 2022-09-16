import React from 'react'

function DisplaySpell(props) {
  const selectedSpell = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
      <h4>Summary</h4>
        <table className='spell-table'>
          <tbody>
            <tr>
              <th>Type: </th>
              {selectedSpell.attack_type && <td>{selectedSpell.attack_type}</td>}
              {!selectedSpell.attack_type && <td> - </td>}
              <th>Range: </th>
              <td>{selectedSpell.range}</td>
            </tr>
            <tr>
              <th>Time: </th>
              <td>{selectedSpell.casting_time}</td>
              <th>Duration: </th>
              <td>{selectedSpell.duration}</td>
            </tr>
            <tr>
              <th>Damage: </th>
              {selectedSpell.damage && <td>{selectedSpell.damage.damage_type.name}</td>}
              {!selectedSpell.damage && <td> - </td>}
              <th>Level</th>
              <td>{selectedSpell.level}</td>
            </tr>
          </tbody>
        </table>
        <hr/>

        {selectedSpell.material && 
          <>
            <h4>Material</h4>
            <p>{selectedSpell.material}</p>
          </>
        }

        <h4>Description</h4>
        {selectedSpell.desc.map((item) => {
          return <p key={item}>{item}</p>
        })}

        {selectedSpell.higher_level.length > 0 &&
          <>
          <h4>Higher Level</h4>
          {selectedSpell.higher_level.map((item) => {
            return <p key={item}>{item}</p>
          })}
          </>
        }
        

      </div>
    </div>
    
  )
}

export default DisplaySpell