import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import imgconfarm from "../../../assets/header-confarm.svg"
import axios from 'axios';
import { toast } from 'react-toastify';
import { RECIPE } from '../../Constants/ENDPOINT';
import { Link } from 'react-router-dom';

function DropRecipe({ data, isDataRecipe,staterecipe }) {
  const [recipdataid,setrecipedataid]=useState([])
   

    const [show, setShow] = useState(false);

    const [recipeId, SetrecipeId] = useState(0);

    const handleClose = () => {
        setShow(false)

    }

    const handleShow = (id) => {
        SetrecipeId(id)
        setShow(true);

    }



    const getDataRecipeByid = async (data) => {
        try {
            let response = await axios.get(RECIPE.getid(data), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            // console.log(response.data)
            setrecipedataid(response.data)
            // console.log(recipdataid)

    // console.log(location)

        } catch (error) {
            console.log(error)
        }
    }



    const DeleteRecipe = async () => {
        try {
            let response = await axios.delete(RECIPE.delete(recipeId), {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            toast.success("Successfaly item")
            setShow(false)
            isDataRecipe()
            console.log(response)
        }
        catch (error) {
            toast.error(error)
        }

    }






    return (
        <>



            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className='text-center'>
                    <img src={imgconfarm} alt="" />
                    <h1 >Delete This Item?</h1>
                    <p className='text-center'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={DeleteRecipe} >
                        Delete this item
                    </Button>


                </Modal.Footer>
            </Modal>


            <DropdownButton className='contanetDrop' >
                <div className="contanerdropdown">
                    <Dropdown.Item  href="#/action-1">  View</Dropdown.Item>
                    <Link to={`/dashboard/updaterecipe/${data}`} state={{getrecipeid:staterecipe,type:"Edit"}}>
                        <Dropdown.Item   href="#/action-2" onClick={()=>getDataRecipeByid(data)} >Edit</Dropdown.Item>
                    </Link>
                    <Dropdown.Item href="#/action-3" onClick={() => handleShow(data)}  >Delete</Dropdown.Item>

                </div>

            </DropdownButton>
        </>
    );
}

export default DropRecipe;