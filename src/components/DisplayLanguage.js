import React from 'react'

function DisplayLanguage(props) {
  const language = props.props;
  return (
    <div className='content-container'>
      <div className='display'>
        <h3>{language.name}</h3>
        <p>Script: <b>{language.script}</b> | Type: <b>{language.type}</b></p>
    <hr/>
        <h5>Typical Speakers</h5>
        <div className='mini-h-list'>
            {language.typical_speakers.map((item, i) => {
                return <h6 key={i}>{item}</h6>
            })}
        </div>
      </div>
    </div>
    
  )
}

export default DisplayLanguage