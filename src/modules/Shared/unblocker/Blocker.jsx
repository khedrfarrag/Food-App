import React, { useEffect, useState } from 'react'
// import { Button, Modal } from 'react-bootstrap'
// import { json, useBlocker } from 'react-router-dom'

export default function Blocker(GetValues) {
    // const [show, setShow] = useState(true);

    // const handleClose = () => {
    //     setShow(false)


    // }
    //   const handleShow = () => {
    //     setShow(true);
    //   }
    // const { location, state, proceed, reset } = useBlocker(({ currentLocation, nextLocation }) => {
    //     console.log(currentLocation)
    //     return currentLocation !== nextLocation
    // })
    // useEffect(()=>{
    //     const handelreload=(e)=>{
    //     // e.preventDefault()
    //     localStorage.setItem("recipe-data",JSON.stringify(GetValues()))
    //     }
    //     window.addEventListener("beforeunload",handelreload)
    //   })
      
    // console.log({currentLocation,nextLocation})
    // console.log(state)
    return (
        <>
            {/* {
                state == "blocked" && (
                    <div>
                        <Modal show={show} onHide={handleClose} animation={false} >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body className='text-center'>
                                <h1 >Create New Category?</h1>
                                <Button type='button' onClick={()=>reset()} variant="success my-2"  >
                                    Canceld
                                </Button>
                                <Button type='button' onClick={()=>   

                                    proceed()
                                }
                                     variant="success my-2"  >
                                    procces
                                </Button>
                            </Modal.Body>
                        </Modal>
                    </div>
                )
            } */}

        </>

    )
}
