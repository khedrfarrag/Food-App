import React from 'react'
import StyleHeadr from "./head.module.css"

export default function HeaderItemsProps({ Title, TitleSpan, Discreption, imag,  }) {
  return (
    <>


      <div className={StyleHeadr.SectionHead}>
        <div className={StyleHeadr.head}>
          <section className={StyleHeadr.contaner}>
            <h1>{Title} </h1>
            <span>{TitleSpan}</span>
          </section>
          <p>{Discreption}</p>
        </div>
        <div className={StyleHeadr.imghead}>
          <img className={StyleHeadr.mainimage} src={imag} alt="logo-home" />
        </div>
      </div>
    </>
  )
}
