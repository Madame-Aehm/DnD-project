import React from 'react'

function DisplayMagicSchool(props) {
  const magicSchool = props.props;
  console.log(magicSchool);
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{magicSchool.name}</h3>
        <p>{magicSchool.desc}</p>
      </div>
    </div>

  )
}

export default DisplayMagicSchool