import React, { useEffect, useState } from 'react'
import Stylecategories from "./categories.module.css"
import HeaderItemsProps from "../../../Shared/components/headerItemProps/HeaderItemsProps"
import headimg from "../../../../assets/header-recipes.svg"
import Spiners from '../../../Shared/components/ModalsSpiner/Spiners'
import DropDownCategory from '../../../Shared/components/Dropdowns/DropDownsCtegory'
import { BASEDTAGID, CATEGORY } from '../../../Constants/ENDPOINT'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function CategoriesList() {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const [value ,setvalueinput]=useState("")

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(CATEGORY.post, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      toast.success("create successfuly")
      handleClose()
      isDataCategory()
      console.log(response)
    }
    catch (error) {
      console.log(error)
      toast.error(error)

    }
  }
  const handleClose = () => {
    setShow(false)
    

  }
  const handleShow = () => {
    setShow(true);
  }
  const [GetTag, SetGetTag] = useState([])

  const GetTagId = async () => {

    try {
      let response = await axios.get(BASEDTAGID, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },


      })
      SetGetTag(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  const [arrayofPage, setArrayofPage] = useState([])

  const [dataCategory, SetDataCategory] = useState([])
  const isDataCategory = async (pagesize, pagenamber, Nameinput) => {
    try {
      let response = await axios.get(CATEGORY.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { pageSize: pagesize, pageNumber: pagenamber, name: Nameinput }
      })
      setArrayofPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      SetDataCategory(response.data.data)

      console.log(dataCategory)
    }
    catch (error) {
      console.log(error)

    }

  }
  const [Namevalue, SetNamevalue] = useState("")

  const ValueName = (input) => {
    SetNamevalue(input.target.value)
    isDataCategory(4, 1, input.target.value)

  }

  useEffect(() => {
    GetTagId()
    isDataCategory(4, 1)
  }, [])
  
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='text-center'>
          <h1 >Create New Category?</h1>
          <form onSubmit={handleSubmit(onSubmit)} >
            <input type="text" name='name' {...register("name")} />
            <Button type='submit' variant="success my-2"  >
              Create Category
            </Button>
          </form>
        </Modal.Body>
          {errors.createCategory && <span>{errors.createCategory.message}</span>}

      </Modal>




      <div className={Stylecategories.contaner}>
        <HeaderItemsProps Title={"Categories"} TitleSpan={"Item"} Discreption={"You can now add your items that any user can order it from the Application and you can edit"} imag={headimg} />
        <div className={Stylecategories.HeadDetalis}>
          <div className={Stylecategories.HeadTitle}>
            <h1>Categories Table Details</h1>
            <span>You can check all details</span>
          </div>
          <Button onClick={handleShow}>Add New Category</Button>
        </div>



        <div className={Stylecategories.secSearching}>
          <div className={Stylecategories.searchinput}>
            <box-icon name='search' color="gray" ></box-icon>
            <input onChange={ValueName} type="search" name="search" id="search" placeholder='Search here ...' />
          </div>

        </div>
        <div className={Stylecategories.contanerUsers}>

          <table>
            <thead>

              <tr className={Stylecategories.trhead}>
                <th>Id</th>
                <th>Name</th>
                <th>creationDate</th>
                <th></th>
              </tr>

            </thead>
            <tbody>
              {dataCategory?.length <= 0 ? <Spiners Title={"MmMm....... Wait a moment! If the data does not come, restart the page.   "} /> : dataCategory?.map((data, index) =>
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.creationDate}</td>

                  <td><DropDownCategory isDataCategory={isDataCategory} data={data.id} /></td>
                </tr>
              )}


            </tbody>



          </table>




        </div>

        {dataCategory?.length <= 0 ? "" :
          <nav aria-label="Page navigation example" className='my-50'>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {
                arrayofPage.map((pagenum) => (

                  <li key={pagenum} className="page-item" onClick={() => isDataCategory(4, pagenum)}><a className="page-link" >{pagenum}</a></li>
                ))
              }
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        }


      </div>


    </>

  )
}
