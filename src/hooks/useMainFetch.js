import React, { useEffect, useState } from 'react'

function useMainFetch(mainURL) {
  const [array, setArray] = useState([]);
  const [object, setObject] = useState ({});
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const getFetchResult = async() => {
    try {
      const response = await fetch(mainURL);
      const result = await response.json();
      setObject(result);
      setArray(result.results);
      setTimeout(() => {
        setPageLoader(false);
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setError(error);
      setPageLoader(false);
    }
  }

  useEffect(() => {
      getFetchResult();
  }, [mainURL]);

  return (
    { object, array, pageLoader, error }
  )
}

export default useMainFetch