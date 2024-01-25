import React from 'react'

export const filterPaginationData = ({create_new_arr =false , state ,data , page , totalDocs}) => {
  
  let obj ;
  if(state != null && !create_new_arr){
    obj = {...state,results:[...state?.results,...data],page}
  }
  else{
    obj = {results:data,page,totalDocs}
  }

  return obj
}


