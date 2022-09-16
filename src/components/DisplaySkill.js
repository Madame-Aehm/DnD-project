import React from 'react'

function DisplaySkill(props) {
  const skill = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{skill.name}</h3>
        {skill.desc.map((item, i) => {
          return <p key={i}>{item}</p>
        })}
      </div>
    </div>

  )
}

export default DisplaySkill