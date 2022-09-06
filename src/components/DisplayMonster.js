import React from 'react'

function DisplayMonster(props) {
  const selectedMonster = props.props;
  return (
    <div className='display'>

      <h3>Type</h3>
      <p>{selectedMonster.type}</p>

      <hr/>

      <h3>Alignment</h3>
      <p>{selectedMonster.alignment}</p>

      <hr/>

      <h3>Stats</h3>
      <table className='stats-table'>
        <tbody>
          <tr>
            <th>Charisma</th>
            <td>{selectedMonster.charisma}</td>
            <th>Constitution</th>
            <td>{selectedMonster.constitution}</td>
          </tr>
          <tr>
            <th>Dexterity</th>
            <td>{selectedMonster.dexterity}</td>
            <th>Intelligence</th>
            <td>{selectedMonster.intelligence}</td>
          </tr>
          <tr>
            <th>Strength</th>
            <td>{selectedMonster.strength}</td>
            <th>Wisdom</th>
            <td>{selectedMonster.wisdom}</td>
          </tr>
          <tr>
            <th>Hitpoints</th>
            <td>{selectedMonster.hit_points}</td>
            <th>Hit Dice</th>
            <td>{selectedMonster.hit_dice}</td>
          </tr>
          <tr>
            <th>Size</th>
            <td>{selectedMonster.size}</td>
            <th>Armor Class</th>
            <td>{selectedMonster.armor_class}</td>
          </tr>
          <tr>
            <th>Challenge Rating</th>
            <td>{selectedMonster.challenge_rating}</td>
            <th>XP</th>
            <td>{selectedMonster.xp}</td>
          </tr>
        </tbody>
      </table>

      <h3>Languages</h3>
      {selectedMonster.languages === "" && <p>No language</p>}
      {selectedMonster.languages !== "" && <p>{selectedMonster.languages}</p>}

      <hr/>

      <h3>Speed</h3>
      <table>
        <tbody>
          {selectedMonster.speed.walk && 
            <tr>
              <th>Walk: </th>
              <td>{selectedMonster.speed.walk}</td>
            </tr>
          }
          {selectedMonster.speed.climb &&
            <tr>
              <th>Climb: </th>
              <td>{selectedMonster.speed.climb}</td>
            </tr>
          }
          {selectedMonster.speed.fly &&
            <tr>
              <th>Fly: </th>
              <td>{selectedMonster.speed.fly}</td>
            </tr>
          }
          {selectedMonster.speed.burrow && 
            <tr>
              <th>Burrow: </th>
              <td>{selectedMonster.speed.burrow}</td>
            </tr>
          }
          {selectedMonster.speed.swim &&
            <tr>
              <th>Swim: </th>
              <td>{selectedMonster.speed.swim}</td>
            </tr>
          }
        </tbody>
      </table>

      <hr/>

      <h3>Condition Immunities</h3>
        {selectedMonster.condition_immunities.length > 0 &&
          <>
            <div className='mini-h-list'>
              {selectedMonster.condition_immunities.map((item) => {
                return <h6 key={item.index}>{item.name}</h6>
              })}
            </div>
          </>
        }
        {selectedMonster.condition_immunities.length === 0 && <h6>None</h6>}

      <hr/>

      <h3>Damage Immunities</h3>
        {selectedMonster.damage_immunities.length > 0 &&
          <>
            <div className='mini-h-list'>
              {selectedMonster.damage_immunities.map((item) => {
                return <h6 key={item}>{item}</h6>
              })}
            </div>
          </>
        }
        {selectedMonster.damage_immunities.length === 0 && <h6>None</h6>}

      <hr/>

      <h3>Damage Resistances</h3>
        {selectedMonster.damage_resistances.length > 0 &&
          <>
            <div className='mini-h-list'>
              {selectedMonster.damage_resistances.map((item) => {
                return <h6 key={item}>{item}</h6>
              })}
            </div>
          </>
        }
        {selectedMonster.damage_resistances.length === 0 && <h6>None</h6>}

      <hr/>

      <h3>Damage Vulnerabilities</h3>
        {selectedMonster.damage_vulnerabilities.length > 0 &&
          <>
            <div className='mini-h-list'>
              {selectedMonster.damage_vulnerabilities.map((item) => {
                return <h6 key={item}>{item}</h6>
              })}
            </div>
          </>
        }
        {selectedMonster.damage_vulnerabilities.length === 0 && <h6>None</h6>}

      <hr/>

      <h3>Actions</h3>
      {selectedMonster.actions.map((item) => {
        return (
          <div className='actions-div' key={item.desc}>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
          <hr/>
          </div>
        )
      })}

      {selectedMonster.legendary_actions.length > 0 &&
        <>
          <h3>Legendary Actions</h3>
          {selectedMonster.legendary_actions.map((item) => {
            return (
              <div className='actions-div' key={item.desc}>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <hr/>
              </div>
            )
          })}
        </>
      }

      {selectedMonster.special_abilities.length > 0 &&
        <>
          <h3>Special Abilities</h3>
          {selectedMonster.special_abilities.map((item) => {
            return (
              <div className='actions-div' key={item.desc}>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <hr/>
              </div>
            )
          })}
        </>
      }

      <p></p>
    </div>
  )
}

export default DisplayMonster