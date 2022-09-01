import React from 'react'

function Spellcaster(props) {
    const selectedClass = props.props;
    if (selectedClass.spellcasting) {
 return (
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
  )

    } else {
    return(
        <h4>No Spellcasting</h4>
    )
        
    }
 
}

export default Spellcaster