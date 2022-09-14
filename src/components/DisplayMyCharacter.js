import React from 'react'

function DisplayMyCharacter({ character }) {
  return (
    <>
      <div className='mini-h-list'>
        <div>
          <h4>Size</h4>
          <p>{character.size}</p>
        </div>
        <div>
          <h4>Speed</h4>
          <p>{character.speed}</p>
        </div>
        <div>
          <h4>Hit Die</h4>
          <p>{character.hit_die}</p>
        </div>
      </div>

      <hr/>

      <h4>Set Proficiencies</h4>
      <div className='mini-h-list'>
        {character.set_proficiencies.map((item) => {
          return (
            <h6 key={item.index}>{item.name}</h6>
          )
        })}
      </div>

      <hr/>

      <h4>Base Stats</h4>
      <div className='mini-h-list'>
        <table>
          <tbody>
            {character.stats.map((item) => {
              return (
                <tr key={item.index}>
                  <th>{item.name}</th>
                  <td>{item.score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
        {character.ability_bonuses && 
          <div>
            <h5>Bonuses:</h5>
            <ul>
              {character.ability_bonuses.map((item) => {
                return (
                  <li key={item.ability_score.url}>{item.bonus} + {item.ability_score.name}</li>
                )
              })}
            </ul>
          </div>
        }
      </div>
      <br/>
    </>
  )
}

export default DisplayMyCharacter