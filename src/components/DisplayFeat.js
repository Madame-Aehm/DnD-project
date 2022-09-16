import React from 'react'

function DisplayFeat(props) {
  const feat = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{feat.name}</h3>
        <h4>Prerequisites</h4>
        {feat.prerequisites.map((item) => {
            return <p key={item.ability_score.index}>Minimum {item.minimum_score} {item.ability_score.name}</p>
        })}

    <hr/>

        <h4>Description</h4>
        {feat.desc.map((item, i) => {
            return (
                <p key={i}>{item}</p>
            )
        })}
      </div>
    </div>
   
  )
}

export default DisplayFeat