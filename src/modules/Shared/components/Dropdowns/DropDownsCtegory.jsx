import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import imgconfarm from "../../../../assets/header-confarm.svg"
import { CATEGORY, RECIPE } from '../../../Constants/ENDPOINT';
import axios from 'axios';
import { toast } from 'react-toastify';



function DropDownCategory({ data, isDataCategory }) {
  const [show, setShow] = useState(false);
  const [recipeId, SetrecipeId] = useState(0);
  const [categoryId, SetCtegoryId] = useState(0);
  // console.log(data)

  const handleClose = () => {
    setShow(false)
    // console.log(false)

  }

  const handleShow = (id) => {
    // console.log(id)
    SetCtegoryId(id)
    // alert(id)
    setShow(true);
    // console.log(true);

  }
  // console.log(recipeId)


  //






 



  const DeleteCategory = async () => {
    try {
      let response = await axios.delete(CATEGORY.delete(categoryId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      toast.success("Successfaly item")
      setShow(false)
      isDataCategory()
  

      // SetDataRecipe(response.data.data)
      // console.log(response)
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
           <Button variant="danger" onClick={DeleteCategory} >
            Delete this item
          </Button> 
        </Modal.Footer>
      </Modal>


      <DropdownButton className='contanetDrop' >
        <div className="contanerdropdown">
          <Dropdown.Item href="#/action-1">  View</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={() => handleShow(data)}  >Delete</Dropdown.Item>

        </div>

      </DropdownButton>
    </>
  );
}

export default DropDownCategory;