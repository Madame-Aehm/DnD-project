import React from 'react'

function NextCycleButton(next, {cycleFetch}) {
    console.log(cycleFetch.cycleFetch)
    if (next.next === "end") {
        return (
            <button className='cycle' disabled>↠</button>
        )
    } else {
        return (
            <button className='cycle' 
                onClick={() => {
                    cycleFetch(next);
                    // setPageLoader(true);
                }}
                >↠</button>
        )
    }
}

export default NextCycleButton