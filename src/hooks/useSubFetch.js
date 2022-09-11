import React, { useEffect, useState } from 'react'

function useSubFetch(restURL) {

  const [selected, setSelected] = useState({});
  const [loader, setLoader] = useState(true);
  const [subError, setSubError] = useState(null);

  const subFetch = async() => {
    try {
      const response = await fetch(restURL);
      const result = await response.json();
      setSelected(result);
      setLoader(false);
    } catch (error) {
      console.log("error", error)
      setSubError(error);
      setLoader(false);
    }
  }

  useEffect(() => {
    subFetch();
}, [restURL]);
  return (
    { selected, loader, subError }
  )
}

export default useSubFetch