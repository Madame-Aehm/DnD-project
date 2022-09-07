import React from 'react'

function DisplayRace(props) {
  const selectedRace = props.props;
  return (
    <div className='display'>
            <h4>Ability Bonuses</h4>
            <div className='mini-h-list'>
              {selectedRace.ability_bonuses.map((item, i) => {
                return <h6 key={i}>{item.ability_score.name} +{item.bonus}</h6>
              })}
            </div>
            <hr/>

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

            <h4>Traits</h4>
            {selectedRace.traits.length === 0 && <p>None</p>}
            {selectedRace.traits.length > 0 &&
              <div className='mini-h-list'>
                {selectedRace.traits.map((item) => {
                  return <h6 key={item.index}>{item.name}</h6>
                })}
              </div>
            }
            <hr/>

            <h4>Languages</h4>
            <p>{selectedRace.language_desc}</p>
            <hr/>

            <h4>Alignment</h4>
            <p>{selectedRace.alignment}</p>
            <hr/>

            <h4>Description</h4>
            <p>Speed: {selectedRace.speed}</p>
            <p>{selectedRace.size_description}</p>
            <p>{selectedRace.age}</p>
            
            {selectedRace.subraces.length > 0 &&
              <>
                <hr/>
                <h4>Subraces</h4>
                <div className='mini-h-list'>
                  {selectedRace.subraces.map((item) => {
                    return <h6 key={item.index}>{item.name}</h6>
                  })}
                </div>
              </>
            }

          </div>
  )
}

export default DisplayRace