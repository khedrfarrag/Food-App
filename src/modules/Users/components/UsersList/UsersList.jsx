import React, { useEffect, useState } from 'react'
import Styleuser from "./user.module.css"
import svgimg from "../../../../assets/header-recipes.svg"
import HeaderItemsProps from '../../../Shared/components/headerItemProps/HeaderItemsProps'
import Spiners from '../../../Shared/components/ModalsSpiner/Spiners'
import { BASEIMAGE, USERRLIST } from '../../../Constants/ENDPOINT'
import axios from 'axios'
import DropUsers from '../../../Shared/components/DropdownUsers/DropUsers'
import { Button } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function UsersList() {
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: 5, pageNumber: 1, userName: "", email: "", phoneNumber: "", country: "", group: ""
  })
  const navigate = useNavigate()
  const Toaddadmin = () => {
    navigate("/dashboard/add-admin")
  }
  // const [Namevalue, SetNamevalue] = useState("")
  // const [Emailvalue, SetEmailvalue] = useState()
  // const [Cantryvalue, SetCantryvalue] = useState("")
  // const [groupvalue, Setgroupvalue] = useState("")


  // pagenation state >>>>>>>>
  const [arrayofPage, setArrayofPage] = useState([])
  const [page, setPage] = useState()
  // const [group, setgroup] = useState("")

  const [DataUsers, SetDataUsers] = useState([])

  const isDataUsers = async ({ pageSize = 5, pageNumber = 1, userName = "", email = "", country = "", group = "" } = {}) => {
    try {
      let response = await axios.get(USERRLIST.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { pageSize: pageSize, pageNumber: pageNumber, userName: userName, email: email, country: country, group: group }
      })
      setArrayofPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      SetDataUsers(response.data.data)
      setPage(response.data.pageNumber)
    }
    catch (error) {
      console.log(error)
    }

  }

  // console.log(arrayofPage)
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const ValueName = (input) => {
  //   SetNamevalue(input.target.value)
  //   isDataUsers(20, 1, input.target.value, Emailvalue, Cantryvalue, groupvalue)

  // }

  // const ValueEmail = (input) => {
  //   SetEmailvalue(input.target.value)
  //   isDataUsers(20, 1, Namevalue, input.target.value, Cantryvalue, groupvalue)

  // }
  // const ValueCantry = (input) => {
  //   SetCantryvalue(input.target.value)
  //   isDataUsers(20, 1, Namevalue, Emailvalue, input.target.value, groupvalue)

  // }
  // const Valuegroup = (input) => {
  //   Setgroupvalue(input.target.value)
  //   isDataUsers(20, 1, Namevalue, Emailvalue, Cantryvalue, input.target.value)

  // }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>

  useEffect(() => {
    isDataUsers({
      pageNumber: 1,
      pageSize: 5,
      userName: searchParams.get("userName"),
      email: searchParams.get("email"),
      country: searchParams.get("country"),
      group: searchParams.get("group"),
    })

  }, [
    searchParams.get("userName"),
    searchParams.get("email"),
    searchParams.get("country"),
    searchParams.get("group"),

  ])
  const range = (start, end, step = 1) => {
    let output = []
    if (typeof end === "undefined") {
      end = start;
      start = 0
    }
    for (let i = start; i < end; i += step) { output.push(i) }
    return output;
  }
  const paginate = ({ currentPage, totalNumberOfPages }) => {
    if (currentPage + 5 > totalNumberOfPages - 1) {
      return range(currentPage - 4, totalNumberOfPages + 1)
    }
    return range(currentPage, currentPage + 5)
  }
  // console.log(paginate())

  return (
    <>
      <div className={Styleuser.contaner}>
        <HeaderItemsProps headers={"Admin"} Title={"Welcome Users"} TitleSpan={"List"} Discreption={"You can now add your items that any user can order it from the Application and you can edit"} imag={svgimg} />

        <div className={Styleuser.HeadDetalis}>
          <Button onClick={Toaddadmin}>Create User Admin</Button>
        </div>
        <div className={Styleuser.secSearching}>
          <div className={Styleuser.searchinput}>
            <box-icon name='search' color="gray" ></box-icon>

            <input
              value={searchParams.get("userName")}
              onChange={(e) => setSearchParams({ userName: e.target.value })} type="text" placeholder='Search here ...' />
          </div>
          <div className={Styleuser.searchemail}>
            <input
              value={searchParams.get("email")}
              onChange={(e) => setSearchParams({ email: e.target.value })} type="text" placeholder='Search by Email ...' />
          </div>

          <div className={Styleuser.optionCatntry}>
            <input
              value={searchParams.get("country")}
              onChange={(e) => setSearchParams({ country: e.target.value })} type="text" placeholder='Search by country ...' />

          </div>
          <div className={Styleuser.optiongroup}>
            <input
              value={searchParams.get("group")}
              onChange={(e) => setSearchParams({ group: e.target.value })} type="search" placeholder='Search by group ...' />

          </div>
        </div>


        <div className={Styleuser.headTable}>
          <table>

            <thead className={Styleuser.contanerHEAD}>

              <tr className={Styleuser.trhead}>
                <th>Id</th>
                <th>Name</th>
                <th>ImagePath</th>
                <th>Email</th>
                <th>Country</th>
                <th>Group</th>
                <th>CreationDate</th>
                <th></th>
              </tr>

            </thead>
            <tbody>
              {DataUsers?.length <= 0 ? <Spiners Title={"MmMm....... Wait a moment! If the data does not come, restart the page.   "} /> : DataUsers?.map((data, index) =>
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.userName}</td>
                  <td>{data.imagePath === null ? "" : <img className={`${Styleuser.imagUser} "w-25"`} src={`${BASEIMAGE}/${data.imagePath}`} alt="img-user" />}</td>
                  <td>{data.email}</td>
                  <td>{data.country}</td>
                  <td>{data.group.id}</td>
                  <td>{data.group.creationDate}</td>
                  <td><DropUsers isDataUsers={isDataUsers} DataUsers={DataUsers} data={data.id} /></td>
                </tr>
              )}


            </tbody>



          </table>


        </div >


        {DataUsers?.length <= 0 ? "" :
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={Styleuser.paginate}>
                <a className="page-link"  onClick={() => isDataUsers({ pageNumber: page - 1, totalNumberOfPages: 5 })} aria-label="Previous">
                  <span  aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {
                paginate({ currentPage: page, totalNumberOfPages: arrayofPage }).map((pagenum, index) => (

                  <li key={index}  className={Styleuser.paginate} onClick={() => isDataUsers({ pageNumber: pagenum, totalNumberOfPages: 5 })}><a className="page-link" >{pagenum}</a></li>
                ))
              }
              <li className={Styleuser.paginate} >
                <a className="page-link " onClick={() => isDataUsers({ pageNumber: page + 1, totalNumberOfPages: 5 })} aria-label="Next">
                  <span className={Styleuser.paginate} aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        }

      </div >


    </>

  )
}


