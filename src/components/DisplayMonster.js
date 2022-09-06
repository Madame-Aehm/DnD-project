import React from 'react'

function DisplayMonster(props) {
  const selectedMonster = props.props;
  return (
    <div className='display'>

      <h4>Type</h4>
      <p>{selectedMonster.type}</p>

      <hr/>

      <h4>Alignment</h4>
      <p>{selectedMonster.alignment}</p>

      <hr/>

      <h4>Stats</h4>
      <table>
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

      <h4>Languages</h4>
      {selectedMonster.languages === "" && <p>No language</p>}
      {selectedMonster.languages !== "" && <p>{selectedMonster.languages}</p>}

      <hr/>

      <h4>Speed</h4>
      <table className='speed-table'>
        <tbody>
          {selectedMonster.speed.walk && 
            <tr>
              <th>Walk</th>
              <td>{selectedMonster.speed.walk}</td>
            </tr>
          }
          {selectedMonster.speed.climb &&
            <tr>
              <th>Climb</th>
              <td>{selectedMonster.speed.climb}</td>
            </tr>
          }
          {selectedMonster.speed.fly &&
            <tr>
              <th>Fly</th>
              <td>{selectedMonster.speed.fly}</td>
            </tr>
          }
          {selectedMonster.speed.burrow && 
            <tr>
              <th>Burrow</th>
              <td>{selectedMonster.speed.burrow}</td>
            </tr>
          }
          {selectedMonster.speed.swim &&
            <tr>
              <th>Swim</th>
              <td>{selectedMonster.speed.swim}</td>
            </tr>
          }
        </tbody>
      </table>

      <h4>Actions</h4>
      {selectedMonster.actions.map((item) => {
        return (
          <div>
            
          </div>
        )
      })}

    </div>
  )
}

export default DisplayMonster