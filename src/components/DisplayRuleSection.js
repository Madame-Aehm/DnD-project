import React, { useEffect } from 'react'
import ReactMarkdown from "react-markdown";

function DisplayRuleSection(props) {
  const ruleSection = props.props;

  function checkForTable() {
    if (ruleSection.desc.includes('\n\n|')) {
      let table = ruleSection.desc.split('\n\n|').pop().split('|\n\n')[0];
    table = "|" + table + "|";
    console.log(table);
    }
  }

  useEffect(() => {
    checkForTable();
  }, [ruleSection])
  
  
  return (
    <div className='content-container'>
      <div className='display rules'>
        <ReactMarkdown>{ruleSection.desc}</ReactMarkdown> 
      </div>
    </div>
  )
}

export default DisplayRuleSection