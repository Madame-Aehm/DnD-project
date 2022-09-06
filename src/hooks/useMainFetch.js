import React, { useEffect, useState } from 'react'

function useMainFetch(mainURL) {
  const [controlList, setControlList] = useState([])
  const [mainList, setMainList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [error, setError] = useState(null);

  const getFetchResult = async() => {
    try {
      const response = await fetch(mainURL);
      const result = await response.json();
      setMainList(result.results);
      setControlList(result.results)
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
    { controlList, mainList, pageLoader, error }
  )
}

export default useMainFetch