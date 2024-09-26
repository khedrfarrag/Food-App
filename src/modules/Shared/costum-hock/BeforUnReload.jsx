import React from 'react'

export default function BeforUnReload(beforeunload) {
    window.addEventListener("beforeunload", beforeunload)  
  return (
    window.removeEventListener("beforeunload", beforeunload)  
 
  )
}
