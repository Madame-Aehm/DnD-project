import React from 'react'

function DisplaySubrace({ props, handleOnClick }) {
  const selectedRace = props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>Subclass of <a className='display-link' onClick={() => handleOnClick(selectedRace.race.url)}>{selectedRace.race.name}</a></h3>

        <h4>Ability Bonuses</h4>
        <div className='mini-h-list'>
          {selectedRace.ability_bonuses.map((item, i) => {
            return <h6 key={i}>{item.ability_score.name} +{item.bonus}</h6>
          })}
        </div>
      <hr/>

        {selectedRace.language_options &&
          <>
            <h4>Language Options</h4>
            <h5>Choose {selectedRace.language_options.choose} from:</h5>
            <div className='mini-h-list'>
              {selectedRace.language_options.from.options.map((item) => {
                return <h6 key={item.item.index}>{item.item.name}</h6>
              })}
            </div>
            <hr/>
          </>
        }

        <h4>Starting Proficiencies</h4>
        {selectedRace.starting_proficiencies.length === 0 && <p>None</p>}
        {selectedRace.starting_proficiencies.length > 0 && 
          <div className='mini-h-list'>
            {selectedRace.starting_proficiencies.map((item) => {
              return <h6 key={item.index}>{item.name}</h6>
            })}
            {selectedRace.starting_proficiency_options && <p>{selectedRace.starting_proficiency_options.desc}</p>}
          </div>
        }
      <hr/>

        <h4>Racial Traits</h4>
        <div className='mini-h-list'>
          {selectedRace.racial_traits.map((item) => {
            return <h6 key={item.index}>{item.name}</h6>
          })}
        </div>

      <hr/>

        <h4>Description</h4>
        <p>{selectedRace.desc}</p>
      </div>
    </div>
    
  )
}

export default DisplaySubrace