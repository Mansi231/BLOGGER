import React from 'react'

const LoadMoreDataBtn = ({ state, fetchDataFun }) => {

    if (state != null && state?.totalDocs > state?.results?.length) {
        return (
            <button className='text-gray-500 bg-gray-100 p-2 px-3 hover:bg-gray-300/30 rounded-md flex items-center gap-2' onClick={()=>fetchDataFun({page:state?.page+1})}>
                Load More
            </button>
        )
    }
}

export default LoadMoreDataBtn
