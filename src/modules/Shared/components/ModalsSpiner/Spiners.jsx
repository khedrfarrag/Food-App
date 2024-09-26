import React from 'react'
import headimg from "../../../../assets/header-confarm.svg"
import StyleSpaners from "./spinner.module.css"
export default function Spiners({Title}) {
  return (
    <div className={ StyleSpaners.spinersSTyle }>
        <img src={headimg} alt="imag-undfinde"  />
        <p>{Title}</p>
    </div>
  )
}
